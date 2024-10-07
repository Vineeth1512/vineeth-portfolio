import React from "react";

import "./Skills.css";
function Skills() {
  return (
    <>
      <h1 class="sub-title">
        My <span>Skills</span>
      </h1>

      <section>
        <div className="first-container" id="skills">
          <h1 className="first-heading">Technical Skills</h1>
          <div className="technical-bars">
            <div className="bar">
              <i style={{ color: "#c95d2e" }} class="bx bxl-html5"></i>
              <div className="info">
                <span>HTML</span>
              </div>
              <div className="progress-line html">
                <span></span>
              </div>
            </div>
            <br />
            <div className="bar">
              <i style={{ color: "#147bbc" }} class="bx bxl-css3"></i>
              <div className="info">
                <span>CSS</span>
              </div>
              <div className="progress-line css">
                <span></span>
              </div>
            </div>
            <br />
            <div className="bar">
              <i style={{ color: "#b0bc1e" }} class="bx bxl-javascript"></i>
              <div className="info">
                <span>JavaScript</span>
              </div>
              <div className="progress-line javaScript">
                <span></span>
              </div>
            </div>
            <br />
            <div className="bar">
              <i style={{ color: "#69bcbc" }} class="bx bxl-react"></i>
              <div className="info">
                <span>React</span>
              </div>
              <div className="progress-line react">
                <span></span>
              </div>
            </div>
            <br></br>
            <div className="bar">
              <i style={{ color: "#c32ec9" }} class="bx bxl-java"></i>
              <div className="info">
                <span>Java</span>
              </div>
              <div className="progress-line java">
                <span></span>
              </div>
            </div>
          </div>
        </div>

        <div className="first-container">
          <h1 className="first-heading">Professional Skills</h1>
          <div className="radial-bars">
            <div className="radial-bar">
              <svg x="0px" y="0px" viewBox="0 0 200 200">
                <circle
                  className="progress-bar"
                  cx={"100"}
                  cy={"100"}
                  r={"80"}
                ></circle>
                <circle
                  className="path path-1"
                  cx={"100"}
                  cy={"100"}
                  r={"80"}
                ></circle>
              </svg>
              <div className="percentage">90%</div>
              <div className="text">Creativity</div>
            </div>
            <div className="radial-bar">
              <svg x="0px" y="0px" viewBox="0 0 200 200">
                <circle
                  className="progress-bar"
                  cx={"100"}
                  cy={"100"}
                  r={"80"}
                ></circle>
                <circle
                  className="path path-2"
                  cx={"100"}
                  cy={"100"}
                  r={"80"}
                ></circle>
              </svg>
              <div className="percentage">80%</div>
              <div className="text">Communication</div>
            </div>
            <div className="radial-bar">
              <svg x="0px" y="0px" viewBox="0 0 200 200">
                <circle
                  className="progress-bar"
                  cx={"100"}
                  cy={"100"}
                  r={"80"}
                ></circle>
                <circle
                  className="path path-3"
                  cx={"100"}
                  cy={"100"}
                  r={"80"}
                ></circle>
              </svg>
              <div className="percentage">75%</div>
              <div className="text">Problem Solving</div>
            </div>
            <div className="radial-bar">
              <svg x="0px" y="0px" viewBox="0 0 200 200">
                <circle
                  className="progress-bar"
                  cx={"100"}
                  cy={"100"}
                  r={"80"}
                ></circle>
                <circle
                  className="path path-4"
                  cx={"100"}
                  cy={"100"}
                  r={"80"}
                ></circle>
              </svg>
              <div className="percentage">85%</div>
              <div className="text">Team Work</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Skills;
