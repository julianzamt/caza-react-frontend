import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../icons/logo.svg";
import "./Home.css";

const Home = () => {
  const logoImages = ["first", "second", "third"];

  const [index, setIndex] = useState(0);
  const [logoImage, setLogoImage] = useState(logoImages[index]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(index + 1);
      if (index > 2) setIndex(0);
      setLogoImage(logoImage[index]);
      console.log(index);
    }, 2000);
    return clearInterval(interval);
  }, [index, logoImage]);

  return (
    <div className="home__container">
      <img src={logo} alt="logo" className={`home__logo ${logoImage}`} />
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
