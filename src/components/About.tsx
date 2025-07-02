import React from 'react';

interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  description: string;
}

const educationData: EducationItem[] = [
  {
    period: "2023 - Present",
    degree: "B.Tech in Computer Science (AI/ML)",
    institution: "Your University",
    description: "Specializing in Artificial Intelligence and Machine Learning with focus on deep learning models and neural networks."
  },
  {
    period: "2020 - 2023",
    degree: "Diploma in Computer Science",
    institution: "Your College",
    description: "Gained strong fundamentals in programming, data structures, algorithms and web development."
  },
  {
    period: "2019 - 2020",
    degree: "10th Standard",
    institution: "Your School",
    description: "Completed secondary education with distinction and developed interest in computer science."
  }
];

const About = () => {
  return (
    <section id="about" className=" relative">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-[20%] h-[40%] bg-primary/10 rounded-full filter blur-[100px]" />

      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          <span className="gradient-text">About Me</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="opacity-90 animate-fade-in delay-100">
              I am a passionate developer on a journey to create elegant solutions through code. 
              My educational path has led me from basic programming to advanced web development 
              and artificial intelligence.
            </p>

            <p className="opacity-90 animate-fade-in delay-200">
              With a foundation in traditional computer science and a growing expertise in modern 
              frameworks like Next.js and TypeScript, I bridge technical knowledge with creative 
              problem solving.
            </p>

            <p className="opacity-90 animate-fade-in delay-300">
              As I continue my B.Tech in Computer Science with a specialization in AI/ML, 
              I'm constantly exploring new technologies and taking on freelance projects 
              that challenge me to grow as a developer.
            </p>
          </div>

          <div className="glass-card p-6 rounded-xl animate-fade-in delay-400">
            <h3 className="text-2xl font-semibold mb-6 gradient-text">Education Journey</h3>
            
            <div className="space-y-8">
              {educationData.map((item, index) => (
                <div key={index} className="relative pl-6 border-l border-primary/30">
                  <div className="absolute -left-[7px] top-2 w-3 h-3 rounded-full bg-primary" />
                  <span className="text-sm text-primary font-medium">{item.period}</span>
                  <h4 className="text-lg font-medium mt-1">{item.degree}</h4>
                  <p className="text-sm text-muted-foreground">{item.institution}</p>
                  <p className="mt-2 text-sm opacity-80">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
