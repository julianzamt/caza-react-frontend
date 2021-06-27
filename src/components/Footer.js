import "./Footer.css";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";

const Footer = () => {
  return (
    <div>
      <footer className="footer__container">
        <section>
          <h4 className="footer__title">Redes</h4>
          <div className="footer__social-container">
            <a className="footer__social-icons" href="https://www.instagram.com/caza.estudio" target="_blanck" rel="noreferrer">
              <InstagramIcon />
            </a>
            <a className="footer__social-icons" href="https://www.facebook.com/cazaestudio" target="_blanck" rel="noreferrer">
              <FacebookIcon />
            </a>
          </div>
        </section>
        <section>
          <h4 className="footer__title">Contacto</h4>
          <div className="footer__text">(+54911) 60003355 | 44082107</div>
          <div className="footer__text">
            <a href="mailto:caza.arqs@gmail.com" style={{ color: "inherit" }}>
              caza.arqs@gmail.com
            </a>
          </div>
          <div className="footer__text">CABA, Argentina</div>
        </section>
        <section style={{ textAlign: "center" }}>
          <a style={{ color: "inherit", fontSize: "0.8em" }} href="https://www.instagram.com/julianzamt/" target="_blanck" rel="noreferrer">
            ©2021 Julián Zamt
          </a>
        </section>
      </footer>
    </div>
  );
};

export default Footer;
