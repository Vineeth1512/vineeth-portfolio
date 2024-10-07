import React, { useRef } from "react";
import "./Project.css";
import Project1 from "../assets/Project1.png";
import Project2 from "../assets/Todo.png";
import Project3 from "../assets/quiz-app.png";

function Project() {
  const todoAppLink = useRef(null);
  const quizAppLink = useRef(null);
  const handleRowClick = (linkRef) => {
    if (linkRef.current) {
      linkRef.current.click();
    }
  };

  return (
    <>
      <section id="projects">
        <div className="portfolio" id="project">
          <div className="main-text" id="project">
            <h2>
              Latest <span>Project</span>
            </h2>
            <div className="portfolio-content">
              <div className="row" onClick={() => handleRowClick(todoAppLink)}>
                <img src={Project2} />
                <div className="layer">
                  <h5>To-Do List</h5>
                  <p>
                    This Todo app is a simple yet powerful tool designed to help
                    users manage their tasks efficiently. Built using HTML, CSS,
                    and JavaScript, it provides a clean and intuitive interface
                    that allows users to add, delete, and mark tasks as
                    completed with ease.
                  </p>
                  <a
                    ref={todoAppLink}
                    href="https://todo-app-js-eta.vercel.app/"
                    target="_blank"
                  >
                    {/* <i
                      class="bx bx-link-external"
                      style={{ color: "aliceblue" }}
                    ></i> */}
                  </a>
                </div>
              </div>
              <div className="row" onClick={() => handleRowClick(quizAppLink)}>
                <img src={Project3} />
                <div className="layer">
                  <h5>Quiz App</h5>
                  <p>
                    <p>
                      The Quiz App is an interactive application that allows
                      users to test their knowledge on various subjects through
                      multiple-choice questions. It features a user-friendly
                      interface where users can select answers, receive
                      immediate feedback, and track their scores. Built with
                      React, the app fetches questions from a public API and
                      dynamically updates the UI based on user interactions.
                    </p>
                  </p>
                  <a
                    href="https://quiz-app-react-ruby.vercel.app/"
                    target="_blank"
                    ref={quizAppLink}
                  >
                    {/* <i
                      class="bx bx-link-external"
                      style={{ color: "aliceblue" }}
                    ></i> */}
                  </a>
                </div>
              </div>
              <div className="row">
                <img src={Project1} />
                <div className="layer">
                  <h5>Weather App</h5>
                  <p>
                    The Weather Detection project is designed to provide
                    real-time weather information based on user inputs such as
                    location or city name. It utilizes APIs (Application
                    Programming Interfaces) provided by weather services to
                    fetch and display current weather conditions and forecasts.
                  </p>
                  <a href="#">
                    <i
                      class="bx bx-link-external"
                      style={{ color: "aliceblue" }}
                    ></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Project;
