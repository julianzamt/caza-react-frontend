import { Link } from "react-router-dom";
import "./Home.css";
import Logo from "../components/Logo";

const Home = () => {
  return (
    <div className="home__container">
      <Logo />
      <div className="home__options">
        <Link to={"/obras"} className="home__item">
          Obras
        </Link>
        <Link to={"/proyectos"} className="home__item">
          Proyectos
        </Link>
        <Link to={"/equipamientos"} className="home__item">
          Equipamientos
        </Link>
        <Link to={"/producto"} className="home__item">
          Producto
        </Link>
        <Link to={"/documentacion"} className="home__item">
          Documentación
        </Link>
        <Link to={"/aboutus"} className="home__item">
          Nosotras
        </Link>
      </div>
    </div>
  );
};

export default Home;
