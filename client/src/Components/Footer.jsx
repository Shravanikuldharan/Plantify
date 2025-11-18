import { Link } from "react-router";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        <div>
          <h1 className="text-2xl font-bold text-white mb-3">🌿 Plantify</h1>
          <p className="text-gray-400 leading-relaxed">
            Bringing nature closer to your home.  
            Fresh plants, premium quality, delivered to your doorstep.
          </p>
        </div>


        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/plants" className="hover:text-white">Shop Plants</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Categories</h2>
          <ul className="space-y-2">
            <li className="hover:text-white">Indoor Plants</li>
            <li className="hover:text-white">Outdoor Plants</li>
            <li className="hover:text-white">Succulents</li>
            <li className="hover:text-white">Air Purifying</li>
            <li className="hover:text-white">Flowering</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Contact Us</h2>
          <ul className="space-y-2">
            <li className="hover:text-white">+91 98765 43210</li>
            <li className="hover:text-white">support@plantify.com</li>
            <li className="hover:text-white">Pune, Maharashtra</li>
          </ul>

          <div className="flex gap-4 mt-4">
            <a className="text-gray-400 hover:text-white text-xl cursor-pointer">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a className="text-gray-400 hover:text-white text-xl cursor-pointer">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a className="text-gray-400 hover:text-white text-xl cursor-pointer">
              <i className="fa-brands fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} Plantify — All Rights Reserved 🌱
      </div>
    </footer>
  );
}

export default Footer;
