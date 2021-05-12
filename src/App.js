import './App.css';
import Home from './pages/Home'
import Proyectos from "./pages/Proyectos"
import Equipamiento from "./pages/Equipamiento"
import Obras from "./pages/Obras"
import Producto from "./pages/Producto"
import Documentacion from "./pages/Documentacion"
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Grid from '@material-ui/core/Grid'
import { Switch, Route } from "react-router"


const App = () => {
  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <Navbar />
        </Grid>
        <Grid item container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/obras" component={Obras} />
            <Route exact path="/proyectos" component={Proyectos} />
            <Route exact path="/equipamiento" component={Equipamiento} />
            <Route exact path="/producto" component={Producto} />
            <Route exact path="/documentacion" component={Documentacion} />
          </Switch>
        </Grid>
        <Grid item>
          <Footer />
        </Grid>
      </Grid>
    </>
  )
}

export default App;
