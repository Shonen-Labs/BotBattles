import Navbar from "@/components/navbar";
import AgentsSection from "@/components/sections/agents";
import CtaSection from "@/components/sections/cta";
import Footer from "@/components/sections/footer";
import HeroSection from "@/components/sections/hero-page";
import HowItWorksSection from "@/components/sections/how-it-works";
import RoomsSection from "@/components/sections/rooms";
import React from "react";

const page = () => {
  return (
    <main className="min-h-screen bg-emerald-900 text-white">
      <Navbar />
      <HeroSection />
      <RoomsSection />
      <AgentsSection />
      <HowItWorksSection />
      <CtaSection />
      <Footer />
    </main>
  );
};

export default page;
