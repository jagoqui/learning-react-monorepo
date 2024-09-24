import { lazy, Suspense } from 'react';
import './App.css';
import { Route } from './components/Route';
import { Router } from './components/Router';
import { routes } from './routes';

const Linkendin = lazy(() => import('./components/pages/Linkendin'));
const GithubPage = lazy(() => import('./components/pages/Github'));

function App() {
  return (
    <main>
      <Suspense fallback={<>Loading...</>}>
        <Router routes={routes}>
          <Route path="/github/:username" Component={GithubPage} />
          <Route path="/linkendin/:profile" Component={Linkendin} />
        </Router>
      </Suspense>
    </main>
  );
}

export default App;
