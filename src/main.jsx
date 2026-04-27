import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const rootElement = document.getElementById("root");
const loader = rootElement.querySelector(".matrix-wrapper");

console.log(rootElement);
console.log(loader);

// Bloquer le scroll immédiatement
document.body.classList.add("no-scroll");

setTimeout(() => {
  // Lancer fade-out
  loader.classList.add("fade-out");

  // Attendre la fin de l'animation
  setTimeout(() => {
    document.body.classList.remove("no-scroll");
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  }, 1000); // doit matcher le CSS
}, 2000); // Temps d'affichage minimum du loader

// @ts-ignore
// createRoot(rootElement).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// );
