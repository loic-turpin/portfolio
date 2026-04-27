// ParticlesBackground.jsx

import { useEffect, useRef } from "react";
import Particles from "@tsparticles/react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

let engineInitialized = false;

const ParticlesBackground = ({ id }) => {
  const initialized = useRef(false);

  useEffect(() => {
    if (!engineInitialized) {
      initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      }).then(() => {
        engineInitialized = true;
        initialized.current = true;
      });
    } else {
      initialized.current = true;
    }
  }, []);

  return (
    <Particles
      id={id}
      className="absolute inset-0 z-0"
      options={{
        fullScreen: { enable: false },
        background: { color: "transparent" },

        particles: {
          number: { value: 200, density: { enable: true, area: 1000 } },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.4 },
          size: { value: { min: 1, max: 4 } },
          links: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: "none",
            outModes: "out",
          },
        },

        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: ["repulse"],
            },
            onClick: {
              enable: true,
              mode: "grab",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 180,
              links: { opacity: 0.6 },
            },
            repulse: {
              distance: 140,
              duration: 0.4,
            },
            push: {
              quantity: 4,
            },
          },
        },

        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBackground;
