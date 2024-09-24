import { Link } from '../Link';

const HomePage = () => (
  <>
    <h1>Home</h1>
    <p>Esta es una página para crear un React Router desde cero</p>
    <Link to="/about">Ir a about</Link>
  </>
);

export default HomePage;
