import { Children, useEffect, useState } from 'react';
import { EVENTS } from '../constants/contants';
import Page404 from './pages/404';
import { match } from 'path-to-regexp';
import { Route } from './Route';
import { getCurrentPath } from '../utils/getCurrentPath';

const { pushstate: PUSHSTATE, popstate: POPSTATE } = EVENTS;

export const Router = ({
  children,
  routes = [],
  defaultComponent: DefaultComponet = () => <Page404 />,
}) => {
  const [currentPath, setCurrentPath] = useState(getCurrentPath);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener(PUSHSTATE, onLocationChange);
    window.addEventListener(POPSTATE, onLocationChange);

    return () => {
      window.removeEventListener(PUSHSTATE, onLocationChange);
      window.removeEventListener(POPSTATE, onLocationChange);
    };
  }, []);

  let routeParams = {};

  // add routes from children <Route /> components
  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type;
    const isRoute = name === Route.name;
    return isRoute ? props : null;
  });

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean);

  const Page =
    routesToUse.find(({ path }) => {
      if (path === currentPath) return true;

      // hemos usado path-to-regexp
      // para poder detectar rutas dinámicas como por ejemplo
      // /search/:query <- :query es una ruta dinámica
      const matcherUrl = match(path, { decode: decodeURIComponent });
      const matched = matcherUrl(currentPath);
      if (!matched) return false;

      // guardar los parámetros de la url que eran dinámicos
      // y que hemos extraído con path-to-regexp
      // por ejemplo, si la ruta es /search/:query
      // y la url es /search/javascript
      // matched.params.query === 'javascript'
      routeParams = matched.params;
      return true;
    })?.Component || DefaultComponet;

  return <Page routeParams={routeParams} />;
};
