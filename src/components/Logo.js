import logoBackgrounds from "../components/logoBackgrounds";
import logo from "../icons/logo.svg";
import "./Logo.css";

const Logo = () => {
  //   const [activeIndex, setActiveIndex] = useState(0);
  //   const [logoBackgrounds, setLogoBackgrounds] = useState(logoBackgroundsSource);
  //   const [logoBackground, setLogoBackground] = useState("");
  //   const [hide, setHide] = useState(true);

  //   useEffect(() => {
  //     const timer = setInterval(() => {
  //       setActiveIndex(prev => (prev + 1 >= logoBackgrounds.length ? 0 : prev + 1));
  //       console.log("index: " + activeIndex);
  //     }, 5000);
  //     setLogoBackground(logoBackgrounds[activeIndex]);
  //     return () => clearInterval(timer);
  //   }, [activeIndex]);

  return (
    <div className="logo__scene fade-in-fwd-logo">
      <img src={logo} alt="logo" className="logo__logo fade-in-fwd-logo" />
      <img src={logoBackgrounds[0]} alt="logo" className="logo__background" />
      <img id="background1" src={logoBackgrounds[1]} alt="logo" className="logo__background" />
      <img id="background2" src={logoBackgrounds[2]} alt="logo" className="logo__background" />
    </div>
  );
};

export default Logo;
