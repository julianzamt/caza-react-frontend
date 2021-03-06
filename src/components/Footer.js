import "./Footer.css";

const Footer = () => {
  return (
    <div>
      <footer className="footer__container">
        {/* <h4 className="footer__title">Contacto</h4>
          <div className="footer__text">
            <a href="mailto:caza.arqs@gmail.com" className="footer__mail">
              caza.arqs@gmail.com
            </a>
          </div>
          <div className="footer__text">(+54911) 6000 3355 - 4408 2107</div>
          <div className="footer__text">CABA, Argentina</div>
        </section>
        <div className="footer__social-container">
          <a className="footer__social-icons" href="https://www.instagram.com/caza.estudio" target="_blanck" rel="noreferrer">
            <InstagramIcon fontSize="large" />
          </a>
          <a className="footer__social-icons" href="https://www.facebook.com/cazaestudio" target="_blanck" rel="noreferrer">
            <FacebookIcon fontSize="large" />
          </a>
        </div>
        <section> */}
        <a className="footer__copyright" href="https://www.instagram.com/julianzamt/" target="_blanck" rel="noreferrer">
          ©2021 Julián Zamt
        </a>
      </footer>
    </div>
  );
};

export default Footer;
