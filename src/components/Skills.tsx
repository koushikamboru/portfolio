import React from 'react';

interface SkillCategory {
  category: string;
  skills: Skill[];
}

interface Skill {
  name: string;
  level: number; // 1-5
  icon?: string;
}

const skillsData: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      { name: "HTML5", level: 5 },
      { name: "CSS3", level: 4 },
      { name: "JavaScript", level: 5 },
      { name: "TypeScript", level: 4 },
      { name: "React", level: 5 },
      { name: "Next.js", level: 4 },
      { name: "Tailwind CSS", level: 5 },
      { name: "SASS", level: 3 }
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: 4 },
      { name: "Express", level: 4 },
      { name: "MongoDB", level: 3 },
      { name: "PostgreSQL", level: 3 },
      { name: "Firebase", level: 4 },
      { name: "GraphQL", level: 3 },
    ]
  },
  {
    category: "AI/ML",
    skills: [
      { name: "Python", level: 4 },
      { name: "TensorFlow", level: 3 },
      { name: "PyTorch", level: 2 },
      { name: "NLP", level: 3 },
      { name: "Computer Vision", level: 2 },
    ]
  },
  {
    category: "Tools",
    skills: [
      { name: "Git", level: 5 },
      { name: "Docker", level: 3 },
      { name: "AWS", level: 3 },
      { name: "Figma", level: 4 },
      { name: "Jira", level: 3 },
    ]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 relative">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[20%] h-[30%] bg-secondary/10 rounded-full filter blur-[100px]" />
      
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="gradient-text">Skills & Technologies</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {skillsData.map((category, index) => (
            <div 
              key={category.category} 
              className="glass-card p-6 rounded-xl animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-xl font-semibold mb-6 gradient-text">{category.category}</h3>
              
              <div className="space-y-6">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-2 h-2 rounded-full ${
                              i < skill.level ? 'bg-primary' : 'bg-muted'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${skill.level * 20}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold mb-8 inline-block gradient-text">Technologies I Work With</h3>
          
          <div className="flex items-center justify-center flex-wrap gap-6">
            {['Next.js', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'MongoDB', 'GraphQL', 'Firebase', 'AWS', 'Python', 'TensorFlow'].map((tech) => (
              <div 
                key={tech} 
                className="glass-card py-3 px-5 rounded-full text-sm hover:scale-110 transition-transform duration-300"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
