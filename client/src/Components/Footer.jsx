import { Link } from "react-router";
import logo from "../assets/logo.png";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiPeerlist } from "react-icons/si";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        <div>
          <h1 className="text-2xl font-bold text-white mb-3 flex items-center">
            <img src={logo} className="h-10 w-10 object-contain mr-2" />
            Plantify
          </h1>
          <p className="text-gray-400 leading-relaxed">
            Bringing nature closer to your home.
            Fresh plants, premium quality, delivered to your doorstep.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/plants" className="hover:text-white">Plants</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Contact Us</h2>

          <ul className="space-y-2">

            <li>
              <a
                href="tel:9834023208"
                className="hover:text-white transition"
              >
                9834023208
              </a>
            </li>

            {/* Email */}
            <li>
              <a
                href="mailto:plantify@gmail.com"
                className="hover:text-white transition"
              >
                plantify@gmail.com
              </a>
            </li>

            <li>
              <a
                href="https://maps.app.goo.gl/yAL4BxJ7wPxVfsFW9"
                target="_blank"
                className="hover:text-white transition"
              >
                Ahmednagar, Maharashtra
              </a>
            </li>

          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Follow Us</h2>

          <div className="flex gap-5 mt-4">

            <a
              href="https://github.com/Shravanikuldharan/Plantify"
              target="_blank"
              className="text-gray-400 hover:text-white text-2xl"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/shravani-kuldharan"
              target="_blank"
              className="text-gray-400 hover:text-white text-2xl"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://peerlist.io/shravani_k"
              target="_blank"
              className="text-gray-400 hover:text-white text-2xl"
            >
              <SiPeerlist />
            </a>

          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
