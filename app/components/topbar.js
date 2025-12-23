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
    <div className="topbar bg-[#0e0d1b] py-3 text-white w-full text-[15px]">
        
        <div className="
          flex flex-col md:flex-row 
          items-center md:items-center 
          justify-center md:justify-between 
          gap-3 md:gap-0 px-5 md:px-10 w-full
        ">

          {/* LEFT CONTACT */}
          <div className="
            contact flex
            justify-center items-center 
            gap-2 md:gap-6
          ">
            {/* Phone */}
            <div className="phone flex items-center gap-2">
              <FaPhone className="text-[20px]" />
              0311 1800222
            </div>

            {/* Email */}
            <div className="email flex items-center gap-2">
              <FaEnvelope className="text-[20px]" />
              primeenergy2024@gmail.com
            </div>
          </div>

          {/* RIGHT SOCIAL ONLY */}
          <div
  className="
    social flex justify-center max-md:hidden items-center
    gap-4 md:gap-5
  "
>
  <a
    href="https://www.facebook.com/profile.php?id=100064169706198&rdid=OgVRjLYRGQ2LBLJl&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16vEHoTqxc%2F#"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaFacebookF className="text-[20px] hover:text-blue-600 cursor-pointer" />
  </a>

  <a
    href=""
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaTwitter className="text-[20px] hover:text-sky-500 cursor-pointer" />
  </a>

  <a
    href=""
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaInstagram className="text-[20px] hover:text-pink-500 cursor-pointer" />
  </a>

  <a
    href=""
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaLinkedinIn className="text-[20px] hover:text-blue-700 cursor-pointer" />
  </a>

  <a
    href=""
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaYoutube className="text-[20px] hover:text-red-600 cursor-pointer" />
  </a>
</div>


        </div>
      </div>
  )
}

export default Topbar
