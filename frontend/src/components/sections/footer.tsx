import React from "react";

const Footer = () => {
  return (
    <footer className="bg-emerald-800 py-4 border-t border-green-800 px-4">
      <div className="  pt-6 flex flex-col md:flex-row justify-between items-center">
        <div className="text-lightgreen  text-sm mb-4 md:mb-0">
          © 2025 BotBattles. All rights reserved.
        </div>
        <div className="text-lightgreen  text-center text-sm">
          Made with 💚 for AI enthusiasts and crypto lovers
        </div>
      </div>
    </footer>
  );
};

export default Footer;
