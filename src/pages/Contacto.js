import React from "react";
import "./Contacto.css";

export const Contacto = () => {
  return (
    <div className="contacto__container fade-in-fwd">
      <h1 className="contacto__title">CAZA estudio</h1>
      <a href="mailto:caza.arqs@gmail.com" className="contacto__links">
        <strong style={{ fontWeight: "normal", color: "#2e2e2e" }}>caza.arqs@gmail.com</strong>
      </a>
      <div>(+54911) 6000 3355 - 4408 2107</div>
      <div>CABA, Argentina</div>

      <div className="footer__social-container">
        <a className="contacto__links" href="https://www.instagram.com/caza.estudio" target="_blanck" rel="noreferrer">
          Instagram &nbsp;
        </a>
        <a className="contacto__links" href="https://www.facebook.com/cazaestudio" target="_blanck" rel="noreferrer">
          /&nbsp; Facebook
        </a>
      </div>
    </div>
  );
};
