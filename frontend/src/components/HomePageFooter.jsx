import React from "react";
import { FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const HomePageFooter = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
   >
    <footer className="bg-gray-900 border-t border-gray-700 text-white py-12 px-4 sm:px-6 md:px-12">
      {/* Main wrapper */}
      <div className="flex justify-center">
        <div
          className="max-w-7xl inline-grid grid-cols-1 sm:grid-cols-[auto_auto_auto]
                     gap-y-10 gap-x-20 text-sm justify-center">
          {/* Brand quote and name*/}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-green-400">MySportSync</h4>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              Add, track and plan all of your favorite matches or see events listed by others!
            </p>
          </div>

          {/* Example company info */}
          <div>
            <h5 className="font-semibold mb-3 text-gray-200">Company</h5>
            <div className="space-y-2 max-w-[150px]">
              <p className="block text-left text-gray-400 hover:text-white transition cursor-default">
                About
              </p>
              <p className="block text-left text-gray-400 hover:text-white transition cursor-default">
                Terms
              </p>
              <p className="block text-left text-gray-400 hover:text-white transition cursor-default">
                Privacy
              </p>
            </div>
          </div>

          {/* Social placeholders */}
          <div>
            <h5 className="font-semibold mb-3 text-gray-200">Connect</h5>
            <div className="flex gap-5 text-xl text-gray-400">
              <span className="hover:text-green-400 cursor-default transition" aria-label="Twitter">
                <FaTwitter />
              </span>
              <span className="hover:text-green-400 cursor-default transition" aria-label="Instagram">
                <FaInstagram />
              </span>
              <span className="hover:text-green-400 cursor-default transition" aria-label="Email">
                <FaEnvelope />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto text-center text-gray-500 mt-10 text-xs">
        © {new Date().getFullYear()} MySportSync. All rights reserved.
      </div>
    </footer>
  </motion.div>
  );
};

export default HomePageFooter;

