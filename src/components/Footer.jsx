// @ts-nocheck

import "../styles/footer.css";
import { Download, Mail, Phone } from "lucide-react";

const LinkedIn = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="21"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
      </svg>
    </div>
  );
};

const ContactElement = ({ icon, text }) => {
  return (
    <div className="flex gap-2">
      {icon}
      <p className="text-xl">{text}</p>
    </div>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="text-center pt-20 h-dvh lg:h-fit">
      <div className="h-full flex flex-col justify-between">
        <h1 className="text-red-700 neon">Contactez-moi</h1>
        <section className="flex justify-evenly flex-wrap lg:gap-8 gap-20 px-10 py-16">
          <a href="/Loic_Turpin_CV.pdf" target="_blank">
            <ContactElement icon={<Download />} text="Mon CV" />
          </a>

          <a href="mailto:loic.turpin97430@gmail.com">
            <ContactElement icon={<Mail />} text="loic.turpin97430@gmail.com" />
          </a>

          <a
            href="https://www.linkedin.com/in/lo%C3%AFc-turpin-627239224/"
            target="_blank"
          >
            <ContactElement icon={<LinkedIn />} text="LinkedIn" />
          </a>

          {/* <ContactElement icon={<Phone />} text="06 28 62 45 36" /> */}
        </section>
        <p className="h-20 flex items-center justify-center border-t border-neutral-500">
          ©{new Date().getFullYear()}, Loïc Turpin, Développeur Web
        </p>
      </div>
    </footer>
  );
};

export default Footer;
