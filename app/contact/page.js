"use client";
import React, { useState } from "react";
import Topbar from "../components/topbar";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { 
  Mail, MapPin, Phone, ArrowRight, ShieldCheck, Users, Clock, 
  MessageSquare, Building, CheckCircle, AlertCircle 
} from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState(""); // success/error message
  const [loading, setLoading] = useState(false); // loading state

  // handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // simple form validation
  const isValid = () => {
    const { name, email, message } = formData;
    if (!name || !email || !message) return false;
    // basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
    return true;
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid()) {
      setStatus("Please fill all required fields correctly.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus(result.error || "Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <div>
      <Topbar />
      <Navbar />

      {/* Header Section */}
      <div
        className="relative w-full h-[70vh] py-32 bg-cover bg-fixed bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/page-header-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="w-8 h-8 bg-white absolute bottom-0 right-8"></div>
        <div className="w-8 h-8 bg-white absolute bottom-8 right-0"></div>

        <div className="relative z-10 flex flex-col items-center text-center px-5 max-w-6xl">
          <div className="flex bg-[#f2801c] p-2 px-3 rounded-2xl items-center gap-2 text-sm text-white mb-4">
            <span className="hover:text-white font-semibold cursor-pointer transition">
              Home
            </span>
            <span className="opacity-60">/</span>
            <span className="text-white font-semibold">Contact</span>
          </div>

          <h1 className="text-white font-bold text-4xl sm:text-5xl md:text-6xl leading-tight font-jakarta">
            Contact us
          </h1>

          <p className="text-gray-200 font-jakarta text-base sm:text-md mt-4 max-w-2xl">
            Discover our professional solar and renewable energy services, delivering
            efficient, reliable, and cost-effective solutions for residential,
            <br className="max-md:hidden" /> commercial, and industrial needs.
          </p>
        </div>
      </div>

      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Left Column - Contact Info */}
            <div className="space-y-8 lg:space-y-10">

              {/* Office Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-[#f2801c] to-orange-600 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-3">Our Head Office</h3>
                  <p className="text-orange-100 text-lg">
                    Lahore, Pakistan
                  </p>
                </div>

                <div className="p-8 space-y-6">
                  <p className="text-gray-700 leading-relaxed">
                    We're proud to serve customers across Pakistan with reliable solar energy solutions from our main office in Lahore.
                  </p>

                  <ul className="space-y-5">
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <Mail size={20} className="text-[#f2801c]" />
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Email</span>
                        <p className="font-medium">Primeenergy2024@gmail.com</p>
                      </div>
                    </li>

                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <Phone size={20} className="text-[#f2801c]" />
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Phone</span>
                        <p className="font-medium">+92 311 1800222</p>
                      </div>
                    </li>

                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <MapPin size={20} className="text-[#f2801c]" />
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Address</span>
                        <p className="font-medium">
                          Multan Road, Tokhar Niaz Baig, Near Park View City, Lahore, Pakistan
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Company Highlights */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-2xl font-bold mb-6">Why Choose Us?</h3>
                <ul className="space-y-5">
                  <li className="flex gap-4">
                    <CheckCircle size={20} className="text-green-600 mt-1" />
                    <span className="text-gray-700">Certified & Trusted Solar Provider</span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle size={20} className="text-green-600 mt-1" />
                    <span className="text-gray-700">Residential, Commercial & Industrial Solutions</span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle size={20} className="text-green-600 mt-1" />
                    <span className="text-gray-700">Expert Installation Team</span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle size={20} className="text-green-600 mt-1" />
                    <span className="text-gray-700">Mon – Sat: 9:00 AM – 6:00 PM</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10">
                <div className="mb-10">
                  <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 font-semibold rounded-full text-sm mb-4">
                    GET IN TOUCH
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    How can we help you today?
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Fill out the form below and our solar experts will get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+92 3XX XXXXXX"
                      className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Tell us about your solar needs..."
                      className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full md:w-auto px-10 py-5 bg-[#f2801c] hover:bg-[#e0711b] text-white font-bold text-lg rounded-xl transition-all flex items-center justify-center gap-3 shadow-md hover:shadow-lg ${
                      loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <MessageSquare size={20} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  {status.message && (
                    <div className={`mt-4 p-4 rounded-xl flex items-center gap-3 ${
                      status.type === "success" 
                        ? "bg-green-50 text-green-800 border border-green-200" 
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}>
                      {status.type === "success" ? (
                        <CheckCircle size={20} />
                      ) : (
                        <AlertCircle size={20} />
                      )}
                      <p>{status.message}</p>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
