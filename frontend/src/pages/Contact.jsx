import FAQ from "../components/FAQ";
import Contact from "../components/Contact";

const ContactPage = () => {
  return (
    <div className="mt-16 pb-16 container mx-auto px-4">
      <p className="text-subtitle text-lg text-center">
        Get In Touch
      </p>
      <h1 className="text-4xl font-bold mb-2 text-center">Contact Me</h1>
      {/* <p className="text-subtitle">Coming soon...</p> */}
      <Contact />
      <div className="border border-gray-200 my-2" />
      <FAQ />
    </div>
  );
};

export default ContactPage;