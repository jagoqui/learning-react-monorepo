import { Link } from '../Link';

const i18n = {
  es: {
    title: 'Sobre nosotros',
    button: 'Ir a la home',
    description:
      '¡Hola! Me llamo Jaidiver Gómez y estoy creando un clon de React Router.',
  },
  en: {
    title: 'About us',
    button: 'Go to home page',
    description:
      'Hi! My name is Jaidiver Gómez and I am creating a clone of React Router.',
  },
};

const useI18n = (lang) => i18n[lang] || i18n.en;

const AboutPage = ({ routeParams }) => {
  const i18n = useI18n(routeParams.lang ?? 'es');
  return (
    <>
      <h1>{i18n.title}</h1>
      <div>
        <img
          src="https://avatars.githubusercontent.com/u/53231080?v=4&size=256"
          alt="foto de jagoqui"
        />
        <p>{i18n.description}</p>
      </div>
      <Link to="/">{i18n.button}</Link>
    </>
  );
};

export default AboutPage;
