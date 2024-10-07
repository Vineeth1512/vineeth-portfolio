import React from "react";
import "./Service.css";
import frontend from "../assets/download front.png";
import backend from "../assets/backend.webp";
export default function Service() {
  return (
    <>
      <section>
        <div className="services">
          <div className="container">
            <h1 className="sub-title">
              My<span>Skills</span>
            </h1>
            <div className="services-list">
              <div>
                <img
                  className="develop-img"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_jgrlFxKlo0ohprhBSxMfaGv2tj2Xpzow6Q&s"
                />
                <h2>Full Stack Developer</h2>
                <ul className="unorder">
                  <li>
                    Proficient in Front-End Technologies: Skilled in HTML, CSS,
                    JavaScript, and front-end frameworks/libraries such as
                    React.
                  </li>
                  <li>
                    Back-End Development Expertise: Experienced with server-side
                    languages and frameworks such as Java (Spring), Node.js and
                    Express.js.
                  </li>
                  <li>
                    Database Management: Knowledgeable in database design and
                    management using SQL (MySQL, PostgreSQL) and NoSQL (MongoDB,
                    Cassandra) databases.
                  </li>
                  <li>
                    Version Control Systems: Experienced in using Git and
                    platforms like GitHub, or Bitbucket for source code
                    management and collaboration.
                  </li>
                  <li>
                    Deployment: Skilled in deploying applications using cloud
                    services like AWS, Netlify and Varcel.
                  </li>
                </ul>
                <a href="#" className="read">
                  Learn More
                </a>
              </div>
              <div>
                <img className="develop-img" src={frontend} />

                <h2>Front-end</h2>
                <ul className="unorder">
                  <li>
                    Writing clean, semantic HTML to improve accessibility and
                    SEO. Media: Embedding and optimizing multimedia content like
                    images, videos, and audio.
                  </li>
                  <li>
                    Creating responsive layouts using Flexbox, Grid, and media
                    queries.Implementing animations and transitions to enhance
                    user experience.
                    {/* Familiar with Java inbuilt classes such as String, Array,
                    Exceptions and Wrapper classes. Active knowledge on
                    Collection Framework */}
                  </li>
                  <li>
                    Utilizing modern JavaScript features (arrow functions,
                    destructuring, spread/rest operators, async/await).
                    {/* Familiar with Integrated Development Environments (IDEs)
                    like IntelliJ IDEA, Eclipse, and Spring Tool Suite.
                    Proficient in using build tools such as Maven and Gradle. */}
                  </li>
                  <li>
                    {/* Experience in developing web applications using Java
                    frameworks like Spring, Hibernate, and JavaServer Faces
                    (JSF). */}
                    Manipulating the DOM efficiently using vanilla JavaScript.
                    Handling user events and ensuring interactive user
                    interfaces.
                  </li>
                  <li>
                    Building reusable components to manage complex UIs. Using
                    libraries like Redux and Context API for state management.
                  </li>
                  <li>
                    Leveraging React Hooks for state and lifecycle management in
                    functional components. Integrating RESTful APIs and GraphQL
                    for data fetching and state.
                  </li>
                </ul>
                <p></p>
                <a href="#" class="read">
                  Learn More
                </a>
              </div>
              <div>
                <img className="develop-img" src={backend} />
                <h2>Back-end</h2>
                <ul className="unorder">
                  <li>
                    Strong understanding of Java syntax, data types, and control
                    structures. Strong understanding and application of OOP
                    principles, including inheritance, polymorphism,
                    encapsulation, and abstraction.
                  </li>

                  <li>
                    Familiar with Java inbuilt classes such as String, Array,
                    Exceptions and Wrapper classes. Active knowledge on
                    Collection Framework
                  </li>
                  <li>
                    Extensive experience in developing applications using Spring
                    Framework and its ecosystem (Spring Boot, Spring MVC, Spring
                    Data).
                  </li>
                  <li>
                    Integrating relational databases (MySQL, PostgreSQL) and
                    NoSQL databases (MongoDB) using Spring Data JPA and Spring
                    Data MongoDB.
                  </li>
                  <li>
                    Building robust web applications and APIs using
                    Express.js.Creating and using middleware for request
                    processing, authentication, and logging.Implementing complex
                    routing for handling various endpoints and HTTP methods
                  </li>
                </ul>
                <a href="#" class="read">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
