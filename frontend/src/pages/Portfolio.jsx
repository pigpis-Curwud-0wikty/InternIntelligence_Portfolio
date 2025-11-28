import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProjects } from "../services/api";
import { Code, Palette, Lightbulb } from "lucide-react";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        setProjects(data);
        setError(null);
      } catch (err) {
        setError("Failed to load projects. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Development Focus areas
  const developmentFocus = [
    {
      icon: <Code className="text-blue-500" size={32} />,
      title: "Frontend Development",
      description: "Building responsive, accessible, and visually appealing user interfaces using modern web technologies.",
      tags: ["React", "Next.js", "Tailwind CSS"]
    },
    {
      icon: <Palette className="text-purple-500" size={32} />,
      title: "UI/UX Principles",
      description: "Learning to create intuitive user experiences with thoughtful design patterns and accessibility in mind.",
      tags: ["Responsive Design", "Accessibility", "User Centered Design"]
    },
    {
      icon: <Lightbulb className="text-pink-500" size={32} />,
      title: "Problem Solving",
      description: "Developing my analytical thinking and debugging skills to tackle complex coding challenges effectively.",
      tags: ["Algorithms", "Data Structures", "Debugging"]
    }
  ];

  if (loading) {
    return (
      <div className="pt-32 pb-16 container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Portfolio</h1>
        <div className="flex justify-center">
          <div className="animate-pulse text-subtitle">Loading projects...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32 pb-16 container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Portfolio</h1>
        <div className="flex justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 pb-16 container mx-auto px-4">
      <div className="mb-16 text-center">
        <p className="text-subtitle text-lg mb-4">
          Explore all my projects and work
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Portfolio</h1>
      </div>

      {/* Development Focus Section */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <p className="text-subtitle text-sm font-semibold uppercase tracking-wide mb-2">
            What I'm Currently Improving My
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">Development Focus</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {developmentFocus.map((focus, index) => (
            <div
              key={index}
              className="bg-secondary border border-border rounded-xl p-6 hover:border-accent transition-all"
            >
              <div className="mb-4">
                {focus.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{focus.title}</h3>
              <p className="text-subtitle text-sm mb-4 leading-relaxed">
                {focus.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {focus.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 text-xs bg-accent/10 text-accent rounded-full border border-accent/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section>
        <div className="text-center mb-8">
          <p className="text-subtitle text-sm uppercase tracking-wide mb-2">
            My Recent Work
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">Projects</h2>
        </div>

        {projects.length === 0 ? (
          <div className="flex justify-center">
            <p className="text-subtitle">No projects found.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link
                key={project._id}
                to={`/product/${project._id}`}
                className="group bg-secondary border border-border rounded-xl overflow-hidden hover:border-accent transition-all hover:shadow-lg"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image || "https://via.placeholder.com/600x400"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-subtitle text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  {project.tech && project.tech.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 4).map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs bg-primary border border-border rounded-full text-subtitle"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="px-3 py-1 text-xs text-subtitle">
                          +{project.tech.length - 4} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Portfolio;