import Navbar from "@/components/navbar";
import HeroSection from "@/components/sections/hero-page";
import React from "react";

const page = () => {
  return (
    <main className="min-h-screen bg-emerald-900 text-white">
      <Navbar />
      <HeroSection />
    </main>
  );
};

export default page;
