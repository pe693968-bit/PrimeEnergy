import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#0b0c1c] text-gray-300 py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* LOGO + DESCRIPTION */}
        <div>
            <a href="/">
          <div className="flex items-center gap-3">

            <img
              src="/logo.png" // apna logo laga lena
              alt="Logo"
              className="w-12 h-12"
              />
            <span className="text-2xl font-bold text-white">Prime Energy</span>
          </div>
              </a>

          <p className="mt-5 leading-7 text-white">
            Harness the power of the sun with our state-of-the-art solar panel solutions.
            We are committed to providing cost-effective solar energy systems for your
            home or business.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex items-center gap-5 mt-6 text-white text-xl">
            <a href="https://www.facebook.com/profile.php?id=100064169706198" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f cursor-pointer hover:text-[#f2801c] duration-300"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter cursor-pointer hover:text-[#f2801c] duration-300"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in cursor-pointer hover:text-[#f2801c] duration-300"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram cursor-pointer hover:text-[#f2801c] duration-300"></i>
            </a>
          </div>
        </div>

        {/* USEFUL LINKS */}
        <div>
          <h3 className="text-white font-semibold text-xl mb-4">Useful Links</h3>
          <ul className="space-y-3 text-white">
            <li>
              <Link href="/about" className="hover:text-[#f2801c] duration-300">About Us</Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-[#f2801c] duration-300">Services</Link>
            </li>
            <li>
              <Link href="/stocks" className="hover:text-[#f2801c] duration-300">Stocks</Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-[#f2801c] duration-300">Products</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#f2801c] duration-300">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-white font-semibold text-xl mb-4">Contact</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <i className="fas fa-phone mt-1"></i>
              <span>0311 1800222</span>
            </li>

            <li className="flex items-start gap-3">
              <i className="fas fa-envelope mt-1"></i>
              <span>primeenergy2024@gmail.com</span>
            </li>

            <li className="flex items-start gap-3">
              <i className="fas fa-map-marker-alt mt-1"></i>
              <span>
               Main Multan Road Tokhar Niaz Baig Near Park View City Lahore , Lahore, Pakistan, 54500
              </span>
            </li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-white font-semibold text-xl mb-4">Newsletter</h3>

          <p className="text-white mb-4 leading-7">
            Be The First To Get The Latest From Us
          </p>

          <div className="flex items-center">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full py-3 px-4 bg-[#fafbf5] text-black placeholder-gray-500 rounded-l-md focus:outline-none"
            />

            <button className="bg-[#f2801c] h-full px-5 py-3 rounded-r-md hover:bg-[#6ccb50] duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="white"
                viewBox="0 0 24 24"
                strokeWidth="2"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16m-7-7l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM COPYRIGHT */}
      <div className="border-t border-gray-700 mt-14 pt-6 text-center text-gray-500 text-sm">
        Copyright © 2024 Prime Energy. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
