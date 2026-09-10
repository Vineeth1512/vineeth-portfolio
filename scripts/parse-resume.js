import fs from 'fs';
import path from 'path';

const resumePath = path.resolve('resume.txt');
const outputPath = path.resolve('src/data/resumeData.js');

function parseResume() {
  if (!fs.existsSync(resumePath)) {
    console.log("No resume.txt found in the root directory. Keeping the default pre-populated data.");
    return;
  }

  const content = fs.readFileSync(resumePath, 'utf-8');
  console.log("Found resume.txt! Parsing...");

  const data = {
    personalInfo: {
      fullName: "Vineeth Kumar Mudham",
      titles: [
        "Full Stack Developer",
        "React Developer",
        "Java Developer",
        "Node.js Developer"
      ],
      email: "vineethkumarmudham@gmail.com",
      phone: "+91 9398695456",
      location: "Hyderabad, India",
      github: "https://github.com/Vineeth1512",
      linkedin: "https://www.linkedin.com/in/vineethkumar-mudham/",
      githubUsername: "Vineeth1512",
      summary: "Enthusiastic Full Stack Developer with practical experience gained through personal projects using HTML, CSS, JavaScript, and ReactJS. Proficient in backend development with Java, Spring Boot, and Node.js using Express.js. Experienced in working with both relational and NoSQL databases, including MySQL and MongoDB."
    },
    statistics: {
      projectsBuilt: 15,
      technologiesUsed: 18,
      githubRepos: 25,
      problemSolving: 300,
      internshipExperienceMonths: 3
    },
    education: [],
    experience: [],
    skills: {
      frontend: [],
      backend: [],
      database: [],
      tools: [],
      aiTools: [],
      deployment: [],
      other: []
    },
    projects: [],
    certifications: [
      {
        name: "Full Stack MERN Development Certification",
        issuer: "Udemy",
        date: "2025",
        link: "#"
      },
      {
        name: "React Developer Advanced Path",
        issuer: "Infosys Springboard",
        date: "2024",
        link: "#"
      }
    ]
  };

  // Basic Section splitting based on capitalized headers
  const sections = content.split(/\n(?=[A-Z\s]+:)/);

  for (const section of sections) {
    const lines = section.trim().split('\n');
    const header = lines[0].replace(':', '').trim();

    if (header === 'EDUCATION') {
      let eduItem = { degree: "", college: "", cgpa: "", year: "", location: "" };
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.includes('Bachelor of Technology')) {
          eduItem.degree = line;
        } else if (line.includes('Institute Of')) {
          const parts = line.split(',');
          eduItem.college = parts[0].trim();
          if (parts[1] && parts[1].includes('Cgpa')) {
            eduItem.cgpa = parts[1].replace(/Cgpa\s*:\s*/i, '').trim();
          }
        } else if (line.includes('2020')) {
          const parts = line.split('|');
          eduItem.year = parts[0].trim();
          if (parts[1]) eduItem.location = parts[1].trim();
        }
      }
      if (eduItem.degree) data.education.push(eduItem);

    } else if (header === 'WORK EXPERIENCE' || header === 'WORK EXPERICNECE') {
      let expItem = { company: "", role: "", duration: "", location: "", responsibilities: [], technologies: [] };
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.includes('AdRefresh Media')) {
          const parts = line.split(',');
          expItem.company = parts[0].trim();
          if (parts[1]) {
            const roleAndDate = parts[1].split('04/2025');
            expItem.role = roleAndDate[0].trim();
            expItem.duration = "04/2025 – 06/2025";
            expItem.location = "Hyderabad, India";
          }
        } else if (line.startsWith('•') || line.startsWith('-')) {
          expItem.responsibilities.push(line.substring(1).trim());
        }
      }
      expItem.technologies = ["React.js", "JavaScript", "Tailwind CSS", "React Router", "HTML5", "CSS3"];
      if (expItem.company) data.experience.push(expItem);

    } else if (header === 'TECHNICAL SKILLS') {
      // Map Skills from OCR style
      let currentCategory = "";
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.includes('Front-End') || line.includes('Back-End') || line.includes('Databases') || line.includes('Tools') || line.includes('Libraries') || line.includes('AI Tools')) {
          currentCategory = line;
        } else if (line && currentCategory) {
          const skillsList = line.split(',').map(s => s.trim());
          const mappedSkills = skillsList.map(name => ({ name, percentage: 85 }));
          if (currentCategory.includes('Front-End')) {
            data.skills.frontend = mappedSkills;
          } else if (currentCategory.includes('Back-End')) {
            data.skills.backend = mappedSkills;
          } else if (currentCategory.includes('Databases')) {
            data.skills.database = mappedSkills;
          } else if (currentCategory.includes('Tools')) {
            data.skills.tools = mappedSkills;
          } else if (currentCategory.includes('Libraries')) {
            data.skills.other = mappedSkills; // or integrate into other
          } else if (currentCategory.includes('AI Tools')) {
            data.skills.aiTools = mappedSkills;
          }
        }
      }

    } else if (header === 'PROJECTS') {
      let currentProj = null;
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.includes('|') && (line.includes('React.js') || line.includes('HTML'))) {
          if (currentProj) data.projects.push(currentProj);
          const parts = line.split('|');
          const name = parts[0].trim();
          const tags = parts[1].split(',').map(t => t.trim());
          currentProj = {
            id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            name,
            category: tags.includes('Node.js') || tags.includes('Firebase') ? "Full Stack" : "Frontend",
            tags,
            description: "",
            features: [],
            challenges: "Integrating backend API endpoints with client layouts smoothly, resolved by custom controller functions.",
            contribution: "Developed the user interface components, set up routing and global state management.",
            github: `https://github.com/Vineeth1512/${name}`,
            demo: `https://${name.toLowerCase()}.vercel.app/`
          };
        } else if (line.startsWith('•') || line.startsWith('-')) {
          if (currentProj) {
            const feat = line.substring(1).trim();
            if (!currentProj.description) {
              currentProj.description = feat;
            }
            currentProj.features.push(feat);
          }
        }
      }
      if (currentProj) data.projects.push(currentProj);
    }
  }

  // Ensure default structure if fields are empty
  if (data.education.length === 0) {
    data.education = [
      {
        degree: "Bachelor of Technology in Information Technology",
        college: "Institute Of Aeronautical Engineering",
        cgpa: "7.33",
        year: "2020 – 2023",
        location: "Telangana, India"
      }
    ];
  }
  if (data.experience.length === 0) {
    data.experience = [
      {
        company: "AdRefresh Media pvt.Ltd",
        role: "Web Developer",
        duration: "04/2025 – 06/2025",
        location: "Hyderabad, India",
        responsibilities: [
          "Worked as the Web Developer and developed the OpsLogic Frontend application, built using React.js, functional components, and React Hooks.",
          "Built a landing page with different modules like Hero, About, Services, Careers, Contact, and Footer sections, integrating controlled components for form handling and safe navigation using React Router.",
          "Optimized performance by improving component structure, optimizing assets, and leveraging lightweight Tailwind CSS styling for fast load times and a consistent branded UI."
        ],
        technologies: ["React.js", "JavaScript (ES6+)", "Tailwind CSS", "React Router", "HTML5", "CSS3"]
      }
    ];
  }

  const jsContent = `export const resumeData = ${JSON.stringify(data, null, 2)};`;
  fs.writeFileSync(outputPath, jsContent, 'utf-8');
  console.log(`Successfully parsed and written resume data to ${outputPath}`);
}

parseResume();
