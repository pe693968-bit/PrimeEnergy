"use client";

import React, { useEffect, useState } from "react";
import { useProducts } from "@/app/context/ProductsContext";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { ArrowRight, PackageX } from "lucide-react";
import Link from "next/link";
import Topbar from "@/app/components/topbar";

const ProductLoader = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
      
      {/* Logo Container */}
      <div className="relative">
        {/* Pulse Ring */}
        <span className="absolute inset-0 rounded-full
                         bg-[#f2801c]/30
                         animate-ping" />

        {/* Logo */}
        <div className="relative z-10 bg-white rounded-full p-6 shadow-xl">
          <img
            src="/logo.png"
            alt="Loading"
            className="h-14 w-14 object-contain animate-spin-slow"
          />
        </div>
      </div>

      {/* Text */}
      <p className="text-gray-600 text-sm tracking-wide">
        Loading product details...
      </p>
    </div>
  );
};

const ProductNotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      
      {/* Icon */}
      <div className="mb-6 flex items-center justify-center h-20 w-20 rounded-full bg-red-100">
        <PackageX size={40} className="text-red-500" />
      </div>

      {/* Text */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Product Not Found
      </h2>

      <p className="text-gray-600 max-w-md mb-6">
        The product you are looking for does not exist or may have been removed.
      </p>

      {/* CTA */}
      <Link
        href="/products"
        className="relative inline-flex items-center gap-2
                   overflow-hidden bg-[#f2801c]
                   text-white font-bold
                   py-3 px-6
                   transition-colors group"
      >
        <span className="relative z-10">Back to Products</span>
        <ArrowRight
          size={20}
          className="relative z-10 -rotate-45
                     transition-transform duration-300
                     group-hover:rotate-0"
        />

        {/* Hover overlay */}
        <span
          className="absolute inset-0 bg-black
                     translate-x-[-100%]
                     group-hover:translate-x-0
                     transition-transform duration-500"
        />
      </Link>
    </div>
  );
};

const ProductPage = () => {
  const { id } = useParams();
  const { products, loading } = useProducts();
  const [product, setProduct] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    if (!loading) {
      const found = products.find((p) => p._id === id);
      setProduct(found || null);
    }
  }, [products, id, loading]);

if (loading) return <ProductLoader />;

if (!product) return <ProductNotFound />;

  return (
    <>
    <Topbar/>
      <Navbar />

      <div className="max-w-7xl max-md:mx-4 mb-15 mx-auto pt-8 pb-12 px-4 lg:px-8">
        {/* Top Section: Images + Info */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Image Slider */}
          <div className="lg:w-1/2">
            <Swiper
              spaceBetween={10}
              navigation
              thumbs={{ swiper: thumbsSwiper }}
              modules={[ Thumbs]}
              className=" overflow-hidden border cursor-pointer"
            >
              {product.images?.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-[450px] max-md:h-[350px] object-contain "
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={3}
              freeMode
              watchSlidesProgress
              className="mt-4"
            >
              {product.images?.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={img}
                    alt={`Thumb ${idx + 1}`}
                    className="w-full h-20 object-cover  cursor-pointer border hover:border-[#f2801c] transition"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Right: Product Info */}
          <div className="lg:w-1/2 flex flex-col gap-4 font-jakarta">
            <h1 className="text-4xl font-bold text-gray-900 max-md:text-2xl">{product.name}</h1>

            <div className="flex flex-col gap-2">
              <p className="text-gray-700">
                <span className="font-semibold">Brand:</span> {product.brand}{" "}
                {product.model && `• ${product.model}`}
              </p>

              {product.price && (
                <p className="text-2xl max-md:text-xl font-bold text-[#f2801c] mt-1">
                  Rs {product.price}
                </p>
              )}

              {product.stockStatus && (
                <span
  className={`inline-flex mt-1 text-sm px-3 py-1  font-medium items-center justify-center max-w-max ${
    product.stockStatus.toLowerCase().includes("out")
      ? "bg-red-100 text-red-600"
      : "bg-green-100 text-green-600"
  }`}
>
  {product.stockStatus}
</span>

              )}
            </div>

            {/* WhatsApp Contact Button */}
            <div>
            <a
  href={`https://wa.me/923111800222?text=Hello,%20I%20am%20interested%20in%20${encodeURIComponent(
    product.name
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="relative mt-4 inline-flex items-center gap-2
             overflow-hidden bg-[#f2801c]
             text-white font-bold
             py-3 px-6
             transition-colors
             group"
>
  {/* TEXT */}
  <span className="relative z-10">
    Contact via WhatsApp
  </span>

  {/* ARROW */}
  <ArrowRight
    size={22}
    className="relative z-10 -rotate-45
               transition-transform duration-300
               group-hover:rotate-0"
  />

  {/* HOVER OVERLAY */}
  <span
    className="absolute inset-0 bg-black
               translate-x-[-100%]
               group-hover:translate-x-0
               transition-transform duration-500 ease-out"
  />
</a>
</div>


            {/* Short Description */}
            {product.shortDescription && (
              <p className="mt-6 text-gray-700">{product.shortDescription}</p>
            )}

            {/* Divider */}
            <hr className="my-4 border-gray-300" />

            {/* Extra Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 text-sm">
              {product.warranty && (
                <p>
                  <span className="font-semibold">Warranty:</span> {product.warranty}
                </p>
              )}
              {product.country && (
                <p>
                  <span className="font-semibold">Country:</span> {product.country}
                </p>
              )}
              {product.certifications && (
                <p>
                  <span className="font-semibold">Certifications:</span>{" "}
                  {product.certifications}
                </p>
              )}
              {product.application && (
                <p>
                  <span className="font-semibold">Application:</span>{" "}
                  {product.application}
                </p>
              )}
              {product.installationType && (
                <p>
                  <span className="font-semibold">Installation Type:</span>{" "}
                  {product.installationType}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section: Full Details */}
        <div className="mt-12 space-y-8">
          {/* Category Fields */}
          {product.categoryFields && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                Product Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
                {Object.entries(product.categoryFields).map(([key, value]) => (
                  <p key={key}>
                    <span className="capitalize font-medium">{key}:</span> {value}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Full Description */}
          {product.fullDescription && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                Product Description
              </h2>
              <p className="text-gray-700">{product.fullDescription}</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductPage;
