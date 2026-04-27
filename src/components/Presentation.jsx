// @ts-nocheck

const Presentation = ({ data }) => {
  return (
    <section
      id="presentation"
      className="text-2xl lg:text-center text-neutral-800 bg-gray-50 px-6 md:px-40 py-32 mt-[100dvh]"
    >
      <h1>À propos de moi</h1>
      <p className="py-10">{data.presentation}</p>
      <a href={`${import.meta.env.BASE_URL}Loic_Turpin_CV.pdf`} target="_blank">
        <button className=" w-full md:w-fit">Mon CV</button>
      </a>
    </section>
  );
};

export default Presentation;
