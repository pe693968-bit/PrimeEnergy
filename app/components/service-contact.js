"use client";

import React, { useState } from "react";
import { 
  Mail, MapPin, Phone, ArrowRight, Clock, Users, ShieldCheck, 
  CheckCircle, AlertCircle, Building, MessageSquare 
} from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch("/api/service-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ 
          type: "success", 
          message: "Thank you! Your project inquiry has been received. We'll contact you soon." 
        });
        setFormData({
          name: "", email: "", phone: "", service: "", budget: "", message: "",
        });
      } else {
        setStatus({ type: "error", message: data.error || "Failed to send message" });
      }
    } catch {
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="w-full py-20 md:py-28  font-jakarta">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 xl:gap-16">

          {/* ================= LEFT SIDEBAR ================= */}
          <div className="space-y-8 lg:space-y-10">

            {/* Office Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-[#f2801c] to-orange-600 p-8 text-white">
                <h3 className="text-2xl font-bold">Prime Energy Lahore</h3>
                <p className="text-orange-100 mt-2 text-lg">Pakistan</p>
              </div>

              <div className="p-8 space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  Our head office in Lahore delivers high-quality solar solutions across Pakistan.
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
                        Multan Road, Tokhar Niaz Baig, Near Park View City, Lahore
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h3 className="text-2xl font-bold mb-6">Why Work With Us?</h3>
              <ul className="space-y-5">
                <li className="flex gap-4">
                  <CheckCircle size={20} className="text-green-600 mt-1" />
                  <span className="text-gray-700">Certified Solar Experts</span>
                </li>
                <li className="flex gap-4">
                  <CheckCircle size={20} className="text-green-600 mt-1" />
                  <span className="text-gray-700">Residential & Commercial Projects</span>
                </li>
                <li className="flex gap-4">
                  <CheckCircle size={20} className="text-green-600 mt-1" />
                  <span className="text-gray-700">Customized Solar Solutions</span>
                </li>
                <li className="flex gap-4">
                  <CheckCircle size={20} className="text-green-600 mt-1" />
                  <span className="text-gray-700">Mon – Sat: 9 AM – 6 PM</span>
                </li>
              </ul>
            </div>
          </div>

          {/* ================= RIGHT FORM ================= */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10 lg:p-12">
              <div className="mb-10">
                <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 font-semibold rounded-full text-sm mb-4">
                  START YOUR PROJECT
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Have a Solar Project in Mind?
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl">
                  Share your requirements and budget. Our team will get back to you with a tailored solar solution within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name, Email, Phone */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full name"
                      required
                      className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
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
                      required
                      className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+92 3XX XXXXXX"
                      className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                    />
                  </div>
                </div>

                {/* Service & Budget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Type <span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={formData.service}
                      onValueChange={(v) => setFormData({ ...formData, service: v })}
                    >
                      <SelectTrigger className="h-14 rounded-xl border-gray-200 focus:border-orange-500">
                        <SelectValue placeholder="Select Service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="installation">Solar Installation</SelectItem>
                        <SelectItem value="maintenance">Maintenance & Service</SelectItem>
                        <SelectItem value="battery">Battery Storage</SelectItem>
                        <SelectItem value="monitoring">Monitoring Systems</SelectItem>
                        <SelectItem value="upgrade">Solar System Upgrade</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Budget (PKR) <span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={formData.budget}
                      onValueChange={(v) => setFormData({ ...formData, budget: v })}
                    >
                      <SelectTrigger className="h-14 rounded-xl border-gray-200 focus:border-orange-500">
                        <SelectValue placeholder="Select Budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PKR 50,000 – 100,000">PKR 50,000 – 100,000</SelectItem>
                        <SelectItem value="PKR 100,000 – 300,000">PKR 100,000 – 300,000</SelectItem>
                        <SelectItem value="PKR 300,000 – 500,000">PKR 300,000 – 500,000</SelectItem>
                        <SelectItem value="PKR 500,000+">PKR 500,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Details <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={6}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project, location, power needs..."
                    required
                    className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full md:w-auto max-md:px-5 max-md:py-3 px-10 py-5 bg-[#f2801c] hover:bg-[#e0711b] text-white font-bold text-lg rounded-xl transition-all flex items-center justify-center gap-3 shadow-md hover:shadow-lg ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <MessageSquare size={20} />
                      <span>Submit Project Inquiry</span>
                    </>
                  )}
                </button>

                {/* Status Message */}
                {status.message && (
                  <div className={`mt-6 p-5 rounded-xl flex items-center gap-4 ${
                    status.type === "success" 
                      ? "bg-green-50 border border-green-200 text-green-800" 
                      : "bg-red-50 border border-red-200 text-red-800"
                  }`}>
                    {status.type === "success" ? (
                      <CheckCircle size={24} className="flex-shrink-0" />
                    ) : (
                      <AlertCircle size={24} className="flex-shrink-0" />
                    )}
                    <p className="font-medium">{status.message}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;