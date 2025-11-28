import { useState, useEffect } from "react";
import { fetchSkills } from "../services/api";
import { Code2, Sparkles, Target } from "lucide-react";

const SkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        setLoading(true);
        const data = await fetchSkills();
        setSkills(data);
        setError(null);
      } catch (err) {
        setError("Failed to load skills. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || "other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  const categoryInfo = {
    frontend: {
      title: "Frontend Development",
      description: "Building beautiful, responsive, and interactive user interfaces",
      color: "text-blue-500"
    },
    backend: {
      title: "Backend Development",
      description: "Creating robust server-side applications and APIs",
      color: "text-green-500"
    },
    tools: {
      title: "Tools & Technologies",
      description: "Essential tools for modern development workflow",
      color: "text-purple-500"
    },
    other: {
      title: "Other Skills",
      description: "Additional technologies and competencies",
      color: "text-gray-500"
    }
  };

  if (loading) {
    return (
      <div className="mt-16 pb-16 container mx-auto px-4">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-pulse text-subtitle text-lg">Loading skills...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-16 pb-16 container mx-auto px-4">
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 pb-16 container mx-auto px-4">
      {/* Header Section */}
      <div className="text-center mb-16">
        <p className="text-subtitle text-lg mb-4">What I Bring to the Table</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">My Skills</h1>
        <p className="text-subtitle text-lg max-w-3xl mx-auto leading-relaxed">
          A comprehensive overview of the technologies and tools I work with to create exceptional web experiences.
        </p>
      </div>

      {/* Introduction Section */}
      <section className="mb-20">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-secondary border border-border rounded-xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <Code2 className="text-blue-500" size={40} />
            </div>
            <h3 className="text-xl font-bold mb-3">Modern Technologies</h3>
            <p className="text-subtitle text-sm">
              Working with cutting-edge frameworks and libraries to build scalable applications
            </p>
          </div>

          <div className="bg-secondary border border-border rounded-xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <Sparkles className="text-purple-500" size={40} />
            </div>
            <h3 className="text-xl font-bold mb-3">Continuous Learning</h3>
            <p className="text-subtitle text-sm">
              Always expanding my skill set and staying updated with industry best practices
            </p>
          </div>

          <div className="bg-secondary border border-border rounded-xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <Target className="text-green-500" size={40} />
            </div>
            <h3 className="text-xl font-bold mb-3">Practical Experience</h3>
            <p className="text-subtitle text-sm">
              Hands-on experience through real-world projects and freelance work
            </p>
          </div>
        </div>
      </section>

      {/* Skills by Category */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
          <p className="text-subtitle">Organized by category for easy navigation</p>
        </div>

        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category} className="mb-16">
            <div className="mb-8">
              <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${categoryInfo[category]?.color || "text-foreground"}`}>
                {categoryInfo[category]?.title || category}
              </h3>
              <p className="text-subtitle">
                {categoryInfo[category]?.description || ""}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {categorySkills.map((skill) => (
                <div
                  key={skill._id}
                  className="bg-secondary border border-border rounded-xl p-6 hover:border-accent transition-all group"
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
                  <h4 className="text-lg font-bold text-center group-hover:text-accent transition-colors">
                    {skill.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        ))}

        {skills.length === 0 && (
          <div className="text-center py-12">
            <p className="text-subtitle">No skills found.</p>
          </div>
        )}
      </section>

      {/* Skills Summary */}
      <section className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Collaborate</h2>
          <p className="text-subtitle mb-6 leading-relaxed">
            With this diverse skill set, I'm ready to tackle challenging projects and contribute to innovative solutions.
            Let's work together to bring your ideas to life!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/portfolio"
              className="px-6 py-3 bg-accent text-primary rounded-full font-medium hover:scale-105 transition-all"
            >
              View My Projects
            </a>
            <a
              href="/contact"
              className="px-6 py-3 bg-secondary border border-border text-foreground rounded-full font-medium hover:border-accent transition-all"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkillsPage;