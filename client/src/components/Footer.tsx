import "../styles/Footer.css";
import compasLogo from "../assets/compas_logo.svg";
import claraContributor from "../assets/clara-contributor.jpg";
import elodieContributor from "../assets/elodie-contributor.jpg";
import alexandreContributor from "../assets/alexandre-contributor.jpg";
import julieContributor from "../assets/julie-contributor.jpg";
import instagramLogo from "../assets/instagram-logo.svg";
import facebookLogo from "../assets/facebook-logo.svg";
import githubLogo from "../assets/github-logo.svg";
import linkedinLogo from "../assets/linkedin-logo.svg";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="logo-container">
        <img
          className="w-16 lg:w-20"
          src={compasLogo}
          alt="logo city compass"
        />
        <p>City Compass</p>
      </div>
      <div className="contributors-container">
        <p>Made with love by</p>
        <div className="flex space-x-4">
          <a href="https://github.com/Liax" rel="noreferrer" target="_blank">
            <img
              className="avatar-footer"
              src={claraContributor}
              alt="clara avatar"
            />
          </a>
          <a
            href="https://github.com/elodiedaubie"
            rel="noreferrer"
            target="_blank"
          >
            <img
              className="avatar-footer"
              src={elodieContributor}
              alt="élodie avatar"
            />
          </a>
          <a
            href="https://github.com/kaitolight"
            rel="noreferrer"
            target="_blank"
          >
            <img
              className="avatar-footer"
              src={alexandreContributor}
              alt="alexandre avatar"
            />
          </a>
          <a
            href="https://github.com/JulieCombeau"
            rel="noreferrer"
            target="_blank"
          >
            <img
              className="avatar-footer"
              src={julieContributor}
              alt="julie avatar"
            />
          </a>
        </div>
      </div>
      <div className="reseaux-container">
        <p>Suivez-nous</p>
        <div className="reseau-footer">
          <img src={instagramLogo} alt="instagram logo" />
          <img src={facebookLogo} alt="facebook logo" />
          <a
            href="https://github.com/WildCodeSchool/2209-wns-adleman-citycompass"
            rel="noreferrer"
            target="_blank"
          >
            <img src={githubLogo} alt="gitHub logo" />
          </a>
          <img src={linkedinLogo} alt="linkedIn logo" />
        </div>
      </div>
    </div>
  );
}
