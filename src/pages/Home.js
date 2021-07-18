import { Link } from "react-router-dom";
import "./Home.css";
import Logo from "../components/Logo";

const Home = () => {
  return (
    <div className="home__container fade-in-fwd">
      <Logo />
      <div className="home__options">
        <Link to={"/obras"} className="home__item">
          obras
        </Link>
        <Link to={"/proyectos"} className="home__item">
          proyectos
        </Link>
        <Link to={"/equipamientos"} className="home__item">
          equipamientos
        </Link>
        <Link to={"/productos"} className="home__item">
          productos
        </Link>
        <Link to={"/documentacion"} className="home__item">
          documentación
        </Link>
        <Link to={"/aboutus"} className="home__item">
          nosotras
        </Link>
        <Link to={"/contacto"} className="home__item">
          contacto
        </Link>
      </div>
    </div>
  );
};

export default Home;
