import "./Footer.css";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";

const Footer = () => {
  return (
    <div>
      <footer className="footer__container">
        <section className="footer__inner-container">
          <h4 className="footer__title">Contacto</h4>
          <ul className="footer__lists">
            <li className="footer__lists-item">
              <PhoneInTalkIcon className="footer__lists-icons" /> (+54911)
              60003355 || 44082107
            </li>
            <li className="footer__lists-item">
              <MailOutlineIcon className="footer__lists-icons" />
              <a href="mailto:caza.arqs@gmail.com" style={{ color: "#3a3a3a" }}>
                caza.arqs@gmail.com
              </a>
            </li>
            <li className="footer__lists-item">CABA, Argentina</li>
          </ul>
        </section>
        <section className="footer__inner-container">
          <div className="footer__social-container">
            <a
              className="footer__social-icons"
              href="https://www.instagram.com/caza.estudio"
              target="_blanck"
              rel="noreferrer"
            >
              <InstagramIcon />
            </a>
            <a
              className="footer__social-icons"
              href="https://www.facebook.com/cazaestudio"
              target="_blanck"
              rel="noreferrer"
            >
              <FacebookIcon />
            </a>
          </div>
        </section>
        <a
          style={{ color: "#585858", fontSize: "0.8em" }}
          href="https://www.instagram.com/julianzamt/"
          target="_blanck"
          rel="noreferrer"
        >
          ©2021 Julián Zamt
        </a>
      </footer>
    </div>
  );
};

export default Footer;
