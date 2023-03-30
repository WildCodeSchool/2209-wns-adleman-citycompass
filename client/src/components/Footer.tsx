import "../styles/footer.css";
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
    <footer className="bg-green">
      <div className="footer">
        <div className="footer__logo">
          <img
            className="w-16 lg:w-20"
            src={compasLogo}
            alt="logo city compass"
          />
          <h2 className="drop-shadow-cream w-44">City Compass</h2>
        </div>
        <div className="footer__contributors">
          <p className="font-latoRegular">Made with love by</p>
          <div className="flex space-x-4">
            <a href="https://github.com/Liax" rel="noreferrer" target="_blank">
              <img
                className="footer__contributors-avatar"
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
                className="footer__contributors-avatar"
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
                className="footer__contributors-avatar"
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
                className="footer__contributors-avatar"
                src={julieContributor}
                alt="julie avatar"
              />
            </a>
          </div>
        </div>
        <div className="footer__socialNetworks">
          <p className="text-2xl font-bold font-latoBlack md:w-20">
            Suivez nous
          </p>
          <div className="footer__socialNetworks-items">
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
    </footer>
  );
}
