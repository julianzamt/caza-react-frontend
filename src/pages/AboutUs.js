import Image from "react-bootstrap/Image";
import portada from "../images/portada_nosotras.jpeg";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="fade-in-fwd">
      <div className="aboutUs__container">
        <h2 className="aboutUs__title">CAZA estudio</h2>
      </div>
      <Image src={portada} className="aboutUs__portada fade-in-fwd" />

      <div className="aboutUs__container">
        <p className="aboutUs__text">
          CA.ZA Estudio surge en el año 2015 a partir de la asociación de las arquitectas Nina Carrara y María Zamtlejfer. El estudio, con sede en
          CABA, centra su actividad en el desarrollo de viviendas unifamiliares, reformas, re funcionalizaciones, desarrollo de mobiliario en serie,
          equipamiento a medida e interiorismo, manteniendo el diálogo entre lo micro y lo macro como método de estudio y aprendizaje.
        </p>
        <div className="aboutUs__cvContainer">
          <p className="border-top p-3 aboutUs__cv text-justify">
            <b>Nina Carrara</b> es arquitecta por la Facultad de Arquitectura, Diseño y Urbanismo de la Universidad de Buenos Aires. Desarrolló su
            carrera profesional en estudios abocados a proyectos arquitectónicos tradicionales de diversas escalas, además de haber formado parte del
            equipo de Estudio Normal, espacio abocado a la experimentación material y proyectual. Fue docente ayudante en la materia Diseño Red IV (ex
            Varas) - FADU UBA -
          </p>
          <p className="border-top p-3 aboutUs__cv text-justify">
            <b>María Zamtlejfer</b> es arquitecta por la Facultad de Arquitectura, Diseño y Urbanismo de la Universidad de Buenos Aires. En el año
            2010 pasa a formar parte del estudio Galli centrado en proyectos de interiorismo. Entre el 2012 y el 2015 continúa su carrera profesional
            en el Estudio GSA (Gonzalo Suárez Aboy y asociados) desarrollando el proyecto y documentación de conjuntos habitacionales de escala media
            mientras que, paralelamente, inicia su actividad profesional independiente llevando a cabo comisiones particulares. Fue docente ayudante
            en la materia Morfología I y II (Taller Forma y Proyecto) - FADU UBA -
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
