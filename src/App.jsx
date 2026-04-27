// @ts-nocheck

import "./App.css";
import data from "./data/data.json";
import Header from "./components/Header.jsx";
import Presentation from "./components/Presentation.jsx";
import Projects from "./components/Projects.jsx";
import Footer from "./components/Footer.jsx";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
  });
};

const HeaderBar = ({ isMenuOpen, setisMenuOpen, showHeader }) => {
  return (
    <motion.div
      className="header-bar flex justify-between"
      animate={{
        y: showHeader || isMenuOpen ? 0 : -120,
        opacity: showHeader || isMenuOpen ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <a onClick={scrollToTop} href="#home" className="p-6">
        <img src="./img/logo.svg" alt="logo_Loïc_Turpin" className="logo" />
      </a>

      <button className="btnMenu" onClick={() => setisMenuOpen(true)}>
        <Menu size="55" />
      </button>

      <nav className={isMenuOpen ? "open" : ""}>
        <ul>
          <li>
            <a className="h-full flex items-center" href="#presentation">
              PRÉSENTATION
            </a>
          </li>

          <li>
            <a className="h-full flex items-center" href="#projects">
              PROJETS
            </a>
          </li>

          <li>
            <a className="h-full flex items-center" href="#contact">
              CONTACT
            </a>
          </li>
        </ul>
      </nav>
    </motion.div>
  );
};

function App() {
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // Toujours visible en haut
      if (currentScroll < 50) {
        setShowHeader(true);
        return;
      }

      if (currentScroll > lastScroll) {
        setShowHeader(false); // scroll vers le bas
      } else {
        setShowHeader(true); // scroll vers le haut
      }

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main
      className="fadeEnter"
      onClick={() => isMenuOpen && setisMenuOpen(false)}
    >
      <HeaderBar
        isMenuOpen={isMenuOpen}
        setisMenuOpen={setisMenuOpen}
        showHeader={showHeader}
      />
      <Header />
      <Presentation data={data} />
      <Projects data={data} setShowHeader={setShowHeader} />
      <Footer />
    </main>
  );
}

export default App;
