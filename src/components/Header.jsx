import { useState, useEffect, useRef } from "react";
import "../styles/header.css";
import { HeaderAnimation } from "./Animations.jsx";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { TypeAnimation } from "react-type-animation";

const Header = () => {
  const [scrollY, setScrollY] = useState(window.scrollY);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setScrollY((prev) => (prev !== currentY ? currentY : prev));
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="h-dvh w-full fixed inset-0 z-[-1] flex items-center justify-center">
      <HeaderAnimation />

      {scrollY < 700 && (
        <>
          <div className="flex items-center justify-center">
            <TypeAnimation
              sequence={[
                "Bienvenue",
                2000,
                "Loïc Turpin",
                2000,
                "Développeur Web",
                2000,
                "HTML, CSS, JS, React",
                2000,
              ]}
              wrapper="span"
              speed={70}
              cursor={true}
              repeat={Infinity}
              className="typeAnimation text-5xl md:text-7xl"
            />
          </div>

          <div className="flex items-center justify-center absolute bottom-0 inset-x-0">
            <DotLottieReact
              src="https://assets7.lottiefiles.com/packages/lf20_td7rozqp.json"
              className="arrowDown"
              speed={0.8}
              loop
              autoplay
            />
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
