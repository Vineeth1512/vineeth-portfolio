import React, { useEffect, useRef } from "react";
import "./Home.css";
import Typed from "typed.js";
function Home() {
  const typedElement = useRef(null);
  useEffect(() => {
    const options = {
      strings: ["Frontend Developer.", "Java Developer.", "Web Developer."],
      typSpeed: 10,
      backSpeed: 100,
      backDelay: 1000,
      loop: true,
    };
    var typed = new Typed(typedElement.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      <section className="home" id="home">
        <div className="home-content">
          <h3>Hello, It's me</h3>
          <h1>Vineeth Kumar Mudham</h1>
          <h3>
            And I'm a <span className="text" ref={typedElement}></span>
          </h3>
          <p>
            I'm a Full Stack Developer.
            <br />
            My first exposure to professional life through internship has
            benefited me mostly in strengthening my personal skills. I have
            developed a positive attitude and a strong sense of responsibility
            being innovative , resourceful, open and responsive to change. It
            has created in me an interest in lifelong learning.
          </p>
          <div className="home-scl">
            <a href="https://www.facebook.com/" target="_blank">
              <i class="bx bxl-facebook"></i>
            </a>
            <a
              href="https://www.instagram.com/vineeth_kumar_patel/"
              target="_blank"
            >
              <i class="bx bxl-instagram"></i>
            </a>
            <a href="https://github.com/Vineeth1512" target="_blank">
              <i class="bx bxl-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/vineeth-kumar-mudham-9b4260196/"
              target="_blank"
            >
              <i class="bx bxl-linkedin"></i>
            </a>
          </div>
          <a href="#" className="btn-box">
            More About Me
          </a>
        </div>
        <span class="home-imgHover"></span>
      </section>
    </>
  );
}

export default Home;
