import React from "react";
import "./About.css";
import myImage from "../assets/shoot.jpg";
function About() {
  return (
    <>
      <section className="about" id="about">
        <div className="about-img">
          <img src={myImage}></img>
        </div>
        <div className="about-text">
          <h2>
            About <span>Me</span>
          </h2>
          <h4>Full Stack Developer</h4>
          <p>
            I'm vineeth kumar & I'm from Hyderbad. I'm an engineering graduate
            from TKR College specialized in Electronics and Communication
            Engineering. I've worked hard in my education & maintained a CGPA of
            8. Along with my degree I've completed Java, SQL and Full Stack
            Courses online.Now I'm ready to apply my knowledge into
            practice.Though I do not have any real life working experience, I've
            had a lot of exposure to the software field. My Goal is to build a
            successfull career as a Full Stack Developer.Moving forward in my
            career I hope to expand my experience across different industries.
            I'm a good learner and team player That's all about my self.
          </p>
          <a href="#" className="btn-box">
            More Abour Me
          </a>
        </div>
      </section>
    </>
  );
}

export default About;
