import React from 'react'
import { 
  FaPhone, 
  FaEnvelope, 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram,
  FaLinkedinIn,
  FaYoutube
} from "react-icons/fa";

const Topbar = () => {
  return (
    <div className="hidden md:block w-full bg-[#0f172a] border-b border-white/5 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-10 flex items-center justify-between text-xs font-medium tracking-wide uppercase text-slate-400">

          {/* LEFT CONTACT */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
              <FaPhone className="text-[#f2801c] text-sm" />
              <span>+92 311 1800222</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <FaEnvelope className="text-[#f2801c] text-sm" />
              <span>primeenergy2024@gmail.com</span>
            </div>
          </div>

          {/* RIGHT SOCIAL */}
          <div className="flex items-center gap-5">
             <span className="hidden lg:inline text-[10px] text-slate-600 font-bold">Follow Us</span>
             <div className="flex items-center gap-4">
                <a href="https://www.facebook.com/profile.php?id=100064169706198&rdid=OgVRjLYRGQ2LBLJl&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16vEHoTqxc%2F#" target="_blank" rel="noopener noreferrer" className="hover:text-[#f2801c] transition-colors">
                  <FaFacebookF size={12} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-[#f2801c] transition-colors">
                  <FaTwitter size={12} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-[#f2801c] transition-colors">
                  <FaInstagram size={12} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-[#f2801c] transition-colors">
                  <FaLinkedinIn size={12} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-[#f2801c] transition-colors">
                  <FaYoutube size={12} />
                </a>
             </div>
          </div>

        </div>
    </div>
  )
}

export default Topbar
