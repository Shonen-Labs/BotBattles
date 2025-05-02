import Navbar from "@/components/navbar";
import AgentsSection from "@/components/sections/agents";
import HeroSection from "@/components/sections/hero-page";
import RoomsSection from "@/components/sections/rooms";
import React from "react";

const page = () => {
  return (
    <main className="min-h-screen bg-emerald-900 text-white">
      <Navbar />
      <HeroSection />
      <RoomsSection />
      <AgentsSection />
    </main>
  );
};

export default page;
