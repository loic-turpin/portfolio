// @ts-nocheck

import "../styles/projects.css";
import ParticlesBackground from "../components/ParticlesBackground.jsx";
import { useState, useRef, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import YouTube from "react-youtube";

// Animations réutilisables

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.3 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20, duration: 0.2 },
  },
  exit: { opacity: 0, scale: 0.3 },
};

// --- COMPOSANTS --- //

const Nav = ({ view, setNextView }) => {
  return (
    <>
      <h1 className="projectsTitle px-5 py-7 lg:pb-20 text-center backdrop-filter-[blur(4px)] lg:text-left lg:hidden">
        Mes projets
      </h1>
      <a className="nav-projects" href="#projects">
        <h1 className="projectsTitle px-5 py-7 lg:pb-20 text-center lg:text-left hidden lg:block">
          Mes projets
        </h1>
        <ul className="flex lg:flex-col text-sm justify-between">
          <hr />
          <li>
            <button
              className={`btn-navProject ${view === "video" ? "btn-selected" : ""}`}
              onClick={() => {
                setNextView("video");
              }}
            >
              AUDIOVISUEL
            </button>
          </li>
          <hr />
          <li>
            <button
              className={`btn-navProject ${view === "web" ? "btn-selected" : ""}`}
              onClick={() => {
                setNextView("web");
              }}
            >
              WEB
            </button>
          </li>

          <hr />
          <li>
            <button
              className={`btn-navProject ${view === "game" ? "btn-selected" : ""}`}
              onClick={() => {
                setNextView("game");
              }}
            >
              JEUX VIDÉO
            </button>
          </li>
          <hr />
        </ul>
      </a>
    </>
  );
};

const VideosProjects = ({
  video,
  image,
  titre,
  typeEtDate,
  cours,
  commande,
  equipe,
  logiciels,
  isActive,
  setActiveVideo,
}) => {
  const playerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeClass, setActiveClass] = useState("");
  const [isReady, setIsReady] = useState(false);

  // 🎯 HOVER
  const handleMouseEnter = () => {
    if (!isOpen) {
      setActiveVideo(titre);
    }
  };

  const handleMouseLeave = () => {
    !isOpen && setActiveVideo(null);
    setActiveClass("");
  };

  useEffect(() => {
    if (!playerRef.current || isOpen) return;

    let timeout;

    try {
      if (isActive) {
        timeout = setTimeout(() => {
          setActiveClass("active");
          playerRef.current.mute?.();
          playerRef.current.playVideo?.();
        }, 300);
      } else {
        clearTimeout(timeout);
        playerRef.current.pauseVideo?.();
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveClass("");
      }
    } catch (e) {
      console.log("hover error:", e);
    }

    return () => clearTimeout(timeout);
  }, [isActive]);

  // 🎯 MODAL OPEN / CLOSE
  useEffect(() => {
    if (!playerRef.current) return;

    try {
      if (isOpen) {
        playerRef.current.unMute?.();
        playerRef.current.playVideo?.();
        document.body.style.overflow = "hidden";
      } else {
        playerRef.current.pauseVideo?.();
        document.body.style.overflow = "auto";
      }
    } catch (e) {
      console.log("open error:", e);
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <motion.div
      layout
      variants={fadeScale}
      className={isOpen ? "modalVideo" : ""}
      onClick={() => (!isOpen ? setIsOpen(true) : setIsOpen(false))}
    >
      <div className={`modalBackground ${isOpen ? "open" : ""}`}></div>

      <div
        className={`boxVideo ${activeClass} ${isOpen ? "open" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* VIDEO */}
        <div
          className="videoBanner"
          onClick={(e) => isOpen && e.stopPropagation()}
        >
          <YouTube
            key={titre} // 🔥 évite les bugs de remount
            videoId={video}
            className="video"
            opts={{
              playerVars: {
                autoplay: 0,
                mute: 1,
                modestbranding: 1,
                rel: 0,
                playsinline: 1,
              },
            }}
            onReady={(event) => {
              playerRef.current = event.target;
              setIsReady(true);
            }}
          />

          {/* OVERLAY IMAGE */}
          <img src={`${import.meta.env.BASE_URL}${image}`} alt={titre} />
          {!isOpen && (
            <h2 className="absolute bottom-0 px-3 py-1.5 text-2xl font-bold text-shadow-xs hidden lg:block">
              {titre}
            </h2>
          )}

          {/* 🔥 LOADER */}
          {!isReady && (
            <div className="loaderBackground">
              <div className="loader">
                <div className="loaderBar"></div>
              </div>
            </div>
          )}
        </div>

        {/* INFOS */}
        <div className={`videoInfos ${isOpen ? "fadeEnter" : ""}`}>
          <h2 className="font-bold">{titre}</h2>
          <h3 className="text-red-800 text-lg">{typeEtDate}</h3>
          {/* BOUTON FERMER */}
          {isOpen && (
            <button
              className="btn-close"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            >
              ✕
            </button>
          )}

          {/* INFOS OPEN */}
          {isOpen && (
            <div className="fadeEnter pt-10 border-t border-neutral-600 flex flex-col xl:flex-row xl:gap-10 xl:justify-between">
              <div className="xl:w-1/2">
                <p>{cours}</p>
                <p>{commande}</p>
              </div>
              <div>
                <p>{equipe}</p>
                <p>{logiciels}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const WebProjects = ({ image, titre, equipe, date, lien, description }) => {
  return (
    <motion.div variants={fadeScale} className="boxWeb">
      <img src={`${import.meta.env.BASE_URL}${image}`} alt={titre} />

      <div className="p-6 lg:p-0 lg:ml-80 lg:pr-6 lg:pt-4 lg:h-75">
        <h2 className="font-bold text-3xl pb-5">{titre}</h2>
        <p className="text-xl pb-2">{equipe}</p>
        <p className="text-xl pb-5">{date}</p>

        <a href={lien} target="_blank">
          <button className="w-full">VISITER LE SITE</button>
        </a>
      </div>
      <hr className="my-6" />
      <div className="text-xl px-6 pb-6">
        {description.map((line, i) => (
          <p className="pb-2" key={i}>
            {line}
          </p>
        ))}
      </div>
    </motion.div>
  );
};

const GamesProjects = ({
  image,
  titre,
  typeLogicielEtDate,
  description,
  lien,
  download,
}) => {
  return (
    <motion.div variants={fadeScale} className="boxGame">
      <ParticlesBackground id={`particles-${titre}`} />

      <div className="flex flex-col xl:flex-row justify-between gap-5 relative z-10">
        <img
          className="w-full xl:w-1/2 my-auto"
          src={`${import.meta.env.BASE_URL}${image}`}
          alt={titre}
        />

        <div className="px-6">
          <h2 className="text-4xl font-bold pb-1">{titre}</h2>
          <h3 className="text-2xl text-red-700 pb-6">{typeLogicielEtDate}</h3>

          <div className="text-xl pb-6">
            {description.map((line, i) => (
              <p className="pb-4" key={i}>
                {line}
              </p>
            ))}
          </div>

          <a href={lien} download={download}>
            <button className="hidden lg:inline-block">TELECHARGER</button>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = ({ data }) => {
  const [view, setView] = useState("web");
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section id="projects" className="min-h-dvh">
      <div className="lg:text-left flex flex-col lg:flex-row lg:py-20">
        <Nav view={view} setNextView={setView} />

        <motion.div
          key={view}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className={`projects ${view === "video" ? "videoViewContainer" : ""}`}
        >
          <AnimatePresence mode="wait">
            {view === "web" &&
              data.sitesWeb.map((site) => (
                <WebProjects key={site.titre} {...site} />
              ))}

            {view === "video" &&
              data.audiovisuel.map((video) => (
                <VideosProjects
                  key={video.titre}
                  {...video}
                  isActive={activeVideo === video.titre}
                  setActiveVideo={setActiveVideo}
                />
              ))}

            {view === "game" &&
              data.jeuxVideo.map((jeu) => (
                <GamesProjects key={jeu.titre} {...jeu} />
              ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
