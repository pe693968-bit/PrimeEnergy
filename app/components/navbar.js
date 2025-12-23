"use client"; // Required for React state in Next.js 13+

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";
import gsap from "gsap";
import Link from "next/link";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // useEffect(() => {
  //   // Animate desktop links on load
  //   gsap.from(".nav-link", {
  //     opacity: 0,
  //     y: -20,
  //     duration: 0.8,
  //     stagger: 0.15,
  //     ease: "power3.out",
  //   });
  // }, []);

  useEffect(() => {
    if (isOpen) {
      // Animate mobile menu links when sidebar opens
      gsap.from(".mobile-nav-link", {
        opacity: 0,
        x: -40,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      });
    }
  }, [isOpen]);

  return (
    <nav className="w-full bg-white">
      <div className="flex justify-between items-center px-5 md:px-10 py-2">
        {/* Logo */}
        <a href="/">
        <div className="logo flex items-center gap-3 w-36 md:w-auto">
          <div className="relative w-19 h-19 max-md:w-15 max-md:h-15">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </div>
        </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex flex-row justify-center items-center gap-10 font-jakarta font-medium text-black">
  <Link href="/" className="list-none nav-link hover:text-[#f2801c] cursor-pointer transition-colors">Home</Link>
  <Link href="/products" className="list-none nav-link hover:text-[#f2801c] cursor-pointer transition-colors">Products</Link>
  <Link href="/about" className="list-none nav-link hover:text-[#f2801c] cursor-pointer transition-colors">About Us</Link>
  <Link href="/services" className="list-none nav-link hover:text-[#f2801c] cursor-pointer transition-colors">Services</Link>
  <Link href="/contact" className="list-none nav-link hover:text-[#f2801c] cursor-pointer transition-colors">Contact Us</Link>
  <Link href="/stocks" className="list-none nav-link hover:text-[#f2801c] cursor-pointer transition-colors">Stocks</Link>
</div>


        {/* Get A Quote Button Desktop */}
        <div className="hidden md:flex">
          <button className="relative cursor-pointer text-md overflow-hidden bg-[#f2801c] nav-btn text-white font-bold py-4 px-7 transition-colors flex items-center gap-2 group">
            <p className="z-10">Get A Quote</p>
            <ArrowRight size={22} className="relative z-10 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
          </button>
        </div>

        {/* Hamburger Icon Mobile */}
        <div className="md:hidden flex items-center">
          <button className="bg-[#f2801c] p-2 rounded-lg" onClick={toggleMenu}>
            {isOpen ? <X size={28} color="white" /> : <Menu size={28} color="white" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed md:hidden top-0 left-0 w-full h-full bg-white shadow-lg z-40
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex justify-between items-center py-4 border border-black border-t-0 border-l-0 border-r-0 mx-5">
          <div className="relative w-16 h-16">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </div>
          <button className="bg-[#f2801c] p-2 rounded-lg" onClick={toggleMenu}>
            <X color="#ffffff" size={28} />
          </button>
        </div>

        <ul className="flex flex-col mt-5 gap-6 px-5 font-jakarta text-black">
            <Link href="/" onClick={toggleMenu} className="mobile-nav-link hover:text-red-500 cursor-pointer transition-colors">Home</Link>
            <Link href="/products" onClick={toggleMenu} className="mobile-nav-link hover:text-red-500 cursor-pointer transition-colors">Products</Link>
  <Link href="/about" onClick={toggleMenu} className="mobile-nav-link hover:text-red-500 cursor-pointer transition-colors">About Us</Link>
  <Link href="/services" onClick={toggleMenu} className="mobile-nav-link hover:text-red-500 cursor-pointer transition-colors">Services</Link>
  <Link href="/contact" onClick={toggleMenu} className="mobile-nav-link hover:text-red-500 cursor-pointer transition-colors">Contact Us</Link>
  <Link href="/stocks" onClick={toggleMenu} className="mobile-nav-link hover:text-red-500 cursor-pointer transition-colors">Stocks</Link>

          <li>
            <a href="/contact">
            <button className="bg-[#f2801c] text-white font-semibold py-3 px-5 mt-4 flex items-center gap-2 rounded-lg hover:bg-[#cf6202] transition-colors">
              Get A Quote
              <ArrowRight size={18} />
            </button>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
