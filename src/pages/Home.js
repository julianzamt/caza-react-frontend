import { Link } from "react-router-dom";
import "./Home.css";
import Logo from "../components/Logo";

const Home = () => {
  return (
    <div className="home__container">
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
        <Link to={"/producto"} className="home__item">
          producto
        </Link>
        <Link to={"/documentacion"} className="home__item">
          documentación
        </Link>
        <Link to={"/aboutus"} className="home__item">
          nosotras
        </Link>
      </div>
    </div>
  );
};

export default Home;
