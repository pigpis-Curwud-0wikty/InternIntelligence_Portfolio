import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Services from "../components/Services";
import Projects from "../components/Projects";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";

const Home = () => {
  return (
    <>
      <Hero />
      {/* <About /> */}
      <div className="divider" />
      <Skills />
      <div className="divider" />
      <Services />
      <div className="divider" />
      <Projects />
      <div className="divider" />
      <Testimonials />
      <div className="divider" />
      <FAQ />
      <div className="divider" />
      {/* CTA Section */}
      <section className="mb-16 max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-green-700 to-green-900 border border-green-500/30 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white">Let's Connect & Create Together</h2>
          <p className="text-white mb-6">
            I'm always looking for opportunities to collaborate, learn, and create. Whether you have a project in mind or just want to connect, I'd love to hear from you!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="px-6 py-3 bg-white text-black rounded-full font-medium hover:scale-105 transition-all"
            >
              Get in Touch
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-500 border border-green-500 text-white rounded-full font-medium hover:border-accent transition-all"
            >
              View My GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;