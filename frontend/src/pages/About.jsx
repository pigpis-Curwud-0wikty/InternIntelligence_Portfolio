import { useState, useEffect } from "react";
import { fetchAbout, fetchSkills } from "../services/api";
import {
  Lightbulb,
  TrendingUp,
  Users,
  Gauge,
  BookOpen,
  Code,
  Rocket,
  ChevronLeft,
  ChevronRight,
  Star
} from "lucide-react";

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Fetch both about and skills data
        const [aboutResponse, skillsResponse] = await Promise.all([
          fetchAbout(),
          fetchSkills()
        ]);
        setAboutData(aboutResponse);
        setSkills(skillsResponse);
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Approach cards
  const approaches = [
    {
      icon: <Lightbulb className="text-yellow-400" size={32} />,
      title: "Clean Code",
      description: "I focus on writing clean and maintainable code."
    },
    {
      icon: <TrendingUp className="text-green-400" size={32} />,
      title: "Always Learning",
      description: "I'm always learning and improving my skills."
    },
    {
      icon: <Users className="text-blue-400" size={32} />,
      title: "Teamwork",
      description: "I value communication and teamwork."
    },
    {
      icon: <Gauge className="text-red-400" size={32} />,
      title: "Performance",
      description: "I care about responsiveness and performance."
    }
  ];

  // Learning milestones
  const milestones = [
    {
      icon: <BookOpen className="text-purple-400" size={32} />,
      title: "First Steps",
      description: "Started learning the fundamentals with C++, OOP, and algorithms."
    },
    {
      icon: <Code className="text-blue-400" size={32} />,
      title: "My First Project",
      description: "Built my first complete project using only React."
    },
    {
      icon: <Rocket className="text-orange-400" size={32} />,
      title: "Exploring the Web",
      description: "Dove deep into web technologies and modern frameworks."
    },
    {
      icon: <TrendingUp className="text-green-400" size={32} />,
      title: "Moving Forward",
      description: "Continuously expanding my skills and taking on new challenges."
    }
  ];

  // Learning journey timeline
  const timeline = [
    {
      date: "August 2024",
      title: "Beginning My Coding Journey",
      description: "Started learning HTML, CSS, and JavaScript fundamentals through online courses and tutorials. Built my first static websites and began to understand the basics of web development.",
      tags: ["HTML", "CSS", "JavaScript Basics"]
    },
    {
      date: "September 2024",
      title: "Diving into React",
      description: "After building a foundation with vanilla JavaScript, I began learning React. Started with the core concepts like components, props, and state, then moved on to hooks and more advanced patterns.",
      tags: ["React", "Components", "Hooks"]
    },
    {
      date: "October 2024",
      title: "Full Stack Development",
      description: "Expanded into backend development with Node.js and Express. Learned about databases, APIs, and how to build complete full-stack applications.",
      tags: ["Node.js", "Express", "MongoDB", "REST APIs"]
    },
    {
      date: "November 2024",
      title: "Advanced Frontend",
      description: "Mastered advanced React patterns, state management with Redux, and modern UI libraries. Started building production-ready applications with best practices.",
      tags: ["Redux", "TypeScript", "Next.js", "Tailwind CSS"]
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "Working with this developer was an absolute pleasure. They delivered a stunning website that perfectly captured our brand identity. Their attention to detail and creativity exceeded our expectations.",
      rating: 5,
      name: "Sarah Johnson",
      position: "Marketing Director at TechCorp"
    },
    {
      quote: "I hired this freelancer for our logo design and brand identity. The results were outstanding! They took time to understand our vision and translated it into a perfect visual representation of our brand.",
      rating: 5,
      name: "Michael Chen",
      position: "Founder of StartupX"
    },
    {
      quote: "Our online store needed a complete redesign, and this developer delivered beyond our expectations. The site is not only beautiful but also performs exceptionally well, leading to increased sales.",
      rating: 5,
      name: "Emily Rodriguez",
      position: "E-commerce Manager at Fashion Boutique"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (loading) {
    return (
      <div className="pt-32 pb-16 container mx-auto px-4">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-pulse text-subtitle text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 pb-16 container mx-auto px-4">
      {/* About Section */}
      <section className="mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            {aboutData?.profileImage && (
              <div className="flex justify-center lg:justify-start">
                <div className="relative">
                  <img
                    src={aboutData.profileImage}
                    alt={aboutData.name || "Profile"}
                    className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl border-4 border-accent shadow-lg"
                  />
                </div>
              </div>
            )}

            {/* About Content */}
            <div className={aboutData?.profileImage ? "" : "lg:col-span-2 text-center"}>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {aboutData?.name || "About Me"}
              </h1>
              {aboutData?.role && (
                <p className="text-accent text-xl md:text-2xl font-semibold mb-6">
                  {aboutData.role}
                </p>
              )}
              <p className="text-subtitle text-lg leading-relaxed mb-8">
                {aboutData?.description || "I'm a passionate developer dedicated to creating beautiful and functional web experiences. With a strong foundation in modern web technologies, I bring ideas to life through clean code and thoughtful design."}
              </p>

              {/* Contact Information */}
              {(aboutData?.email || aboutData?.phone || aboutData?.address) && (
                <div className="space-y-3 mb-6">
                  {aboutData?.email && (
                    <div className="flex items-center gap-3">
                      <span className="text-accent font-semibold">Email:</span>
                      <a href={`mailto:${aboutData.email}`} className="text-foreground hover:text-accent transition-colors">
                        {aboutData.email}
                      </a>
                    </div>
                  )}
                  {aboutData?.phone && (
                    <div className="flex items-center gap-3">
                      <span className="text-accent font-semibold">Phone:</span>
                      <a href={`tel:${aboutData.phone}`} className="text-foreground hover:text-accent transition-colors">
                        {aboutData.phone}
                      </a>
                    </div>
                  )}
                  {aboutData?.address && (
                    <div className="flex items-center gap-3">
                      <span className="text-accent font-semibold">Location:</span>
                      <span className="text-foreground">{aboutData.address}</span>
                    </div>
                  )}
                </div>
              )}

              {/* CV Download Button */}
              {aboutData?.cvLink && (
                <div className="mt-6">
                  <a
                    href={aboutData.cvLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 bg-accent text-primary rounded-full font-medium hover:scale-105 transition-all shadow-lg"
                  >
                    Download CV
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* My Experience Section */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-semibold mb-2 uppercase tracking-wide">What Skills I Have</p>
          <h2 className="text-3xl md:text-4xl font-bold">My Experience</h2>
        </div>

        <div className="max-w-5xl mx-auto">
          {skills.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {skills.map((skill) => (
                <div
                  key={skill._id}
                  className="p-6 bg-secondary border border-border rounded-xl hover:border-accent transition-all group"
                >
                  {skill.icon && (
                    <div className="mb-4 flex justify-center">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-16 h-16 object-contain group-hover:scale-110 transition-transform"
                      />
                    </div>
                  )}
                  <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors text-center">
                    {skill.name}
                  </h3>
                  {skill.category && (
                    <p className="text-subtitle text-xs text-center capitalize">{skill.category}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-subtitle">No skills data available yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* My Approach Section */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <p className="text-subtitle text-sm mb-2">More than just code</p>
          <h2 className="text-3xl md:text-4xl font-bold">My Approach</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {approaches.map((approach, index) => (
            <div key={index} className="bg-secondary border border-border rounded-xl p-6 text-center hover:border-accent transition-all">
              <div className="flex justify-center mb-4">
                {approach.icon}
              </div>
              <h3 className="font-semibold mb-2">{approach.title}</h3>
              <p className="text-subtitle text-sm">{approach.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How I Started Section */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <p className="text-subtitle text-sm mb-2">My Learning Path</p>
          <h2 className="text-3xl md:text-4xl font-bold">How I Started</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {milestones.map((milestone, index) => (
            <div key={index} className="bg-secondary border border-border rounded-xl p-6 hover:border-accent transition-all">
              <div className="mb-4">
                {milestone.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{milestone.title}</h3>
              <p className="text-subtitle text-sm">{milestone.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* My Learning Journey Timeline */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <p className="text-subtitle text-sm mb-2">My Learning Path</p>
          <h2 className="text-3xl md:text-4xl font-bold">My Learning Journey</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-accent"></div>

            {timeline.map((event, index) => (
              <div key={index} className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'}`}>
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-accent rounded-full -ml-2 border-4 border-primary"></div>

                <div className={`ml-20 md:ml-0 ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                  <div className="bg-secondary border border-border rounded-xl p-6 hover:border-accent transition-all">
                    <p className="text-accent text-sm font-semibold mb-2">{event.date}</p>
                    <h3 className="font-bold text-lg mb-3">{event.title}</h3>
                    <p className="text-subtitle text-sm mb-4">{event.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-3 py-1 text-xs bg-accent/10 text-accent rounded-full border border-accent/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Clients' Testimonials</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Testimonial Card */}
            <div className="bg-secondary border border-border rounded-xl p-8 md:p-12">
              <div className="mb-6">
                <p className="text-lg leading-relaxed mb-6">
                  "{testimonials[currentTestimonial].quote}"
                </p>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <div>
                <p className="font-bold">{testimonials[currentTestimonial].name}</p>
                <p className="text-subtitle text-sm">{testimonials[currentTestimonial].position}</p>
              </div>
            </div>

            {/* Navigation Arrows */}
            {testimonials.length > 1 && (
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={prevTestimonial}
                  className="p-3 bg-secondary border border-border rounded-full hover:border-accent hover:bg-accent hover:text-primary transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-3 bg-secondary border border-border rounded-full hover:border-accent hover:bg-accent hover:text-primary transition-all"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            )}

            {/* Indicators */}
            {testimonials.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${index === currentTestimonial ? "bg-accent w-8" : "bg-border"
                      }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto">
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
              href={aboutData?.github || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-500 border border-green-500 text-white rounded-full font-medium hover:border-accent transition-all"
            >
              View My GitHub
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;