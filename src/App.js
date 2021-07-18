import { useContext } from "react";
import AppContext from "./context/AppContext";
import Home from "./pages/Home";
import SectionCovers from "./pages/SectionCovers";
import SectionInside from "./pages/SectionInside";
import Documentacion from "./pages/Documentacion";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import { Contacto } from "./pages/Contacto";
import Register from "./pages/Register.js";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Switch, Route } from "react-router";
import { Redirect } from "react-router-dom";
import "./App.css";

const App = () => {
  const context = useContext(AppContext);
  return (
    <>
      <div className="app__container">
        <section>
          <Navbar />
        </section>
        <section>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/obras" render={() => <SectionCovers section="obras" />} />
            <Route exact path="/proyectos" render={() => <SectionCovers section="proyectos" />} />
            <Route exact path="/equipamientos" render={() => <SectionCovers section="equipamientos" />} />
            <Route exact path="/productos" render={() => <SectionCovers section="productos" />} />
            <Route exact path="/documentacion" render={() => <Documentacion section="documentacion" />} />
            <Route exact path="/aboutus" component={AboutUs} />
            <Route exact path="/contacto" component={Contacto} />
            <Route exact path="/admin" render={() => (context.login ? <Admin /> : <Redirect to="/admin/login" />)} />
            <Route exact path="/admin/login" component={Login} />
            <Route exact path="/admin/register" component={Register} />
            <Route path="/:section/:id" component={SectionInside} />
          </Switch>
        </section>
        <section>
          <Footer />
        </section>
      </div>
    </>
  );
};

export default App;
