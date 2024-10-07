import React from "react";
import "./Contact.css";
function Contact() {
  return (
    <>
      <section className="contact" id="contact">
        <div className="contact-text">
          <h2>
            Contact <span>Me</span>
          </h2>
          <h4>Let's Work Together</h4>
          <p>
            Are you looking for a skilled Full Stack Developer to bring your
            project to life? With expertise in React and a deep understanding of
            both front-end and back-end development, I am ready to collaborate
            and help you achieve your goals. Whether it's building a dynamic web
            application, optimizing user experiences, or tackling complex
            technical challenges, I am here to provide solutions tailored to
            your needs. Feel free to reach out to discuss how we can work
            together and turn your ideas into reality. Let's create something
            amazing!
          </p>
          <div class="contact-list">
            <li>
              <i class="bx bxs-send"></i>v4vinnu15@gmail.com
            </li>
            <li>
              <i class="bx bx-phone"></i>9398695456
            </li>
          </div>
          <div class="contact-icons">
            <a href="https://www.facebook.com/" target="_blank">
              <i class="bx bxl-facebook-circle"></i>
            </a>
            <a href="https://github.com/Vineeth1512" target="_blank">
              <i class="bx bxl-github"></i>
            </a>
            <a
              href="https://www.instagram.com/vineeth_kumar_patel/"
              target="_blank"
            >
              <i class="bx bxl-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/vineeth-kumar-mudham-9b4260196/"
              target="_blank"
            >
              <i class="bx bxl-linkedin"></i>
            </a>
          </div>
        </div>
        <div className="contact-form">
          <form action="">
            <input type="text" placeholder="Enter Your Name" required />
            <input type="email" placeholder="Enter Your Email" required />
            <input type="" placeholder="Enter Your Subject" />
            <textarea
              name=""
              id=""
              cols="40"
              rows="10"
              placeholder="Enter Your Message"
              required
            ></textarea>
            <input type="submit" value="submit" class="send" />
          </form>
        </div>
      </section>
      <div class="last-text">
        <p>Developed By Vineeth....</p>
      </div>
      <a href="#" class="top">
        <i class="bx bx-up-arrow-alt"></i>
      </a>
    </>
  );
}

export default Contact;
