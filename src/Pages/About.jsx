import { useEffect } from "react";

function About() {

  useEffect(() => {
    document.title = "BookVerse | About";
  }, []);

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h1>About BookVerse</h1>

      <p>
        BookVerse is an online book management application built using
        React and React Router DOM. It demonstrates routing,
        navigation, dynamic rendering, state management, and reusable
        components.
      </p>

      <br />

      <h2>Our Mission</h2>

      <p>
        Our goal is to provide an easy-to-use platform where users can
        explore books, discover authors, and manage their reading
        collection with a simple and interactive interface.
      </p>

      <br />

      <h2>Technologies Used</h2>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          lineHeight: "2",
          fontSize: "18px",
        }}
      >
        <li>⚛ React JS</li>
        <li>⚡ Vite</li>
        <li>🛣 React Router DOM</li>
        <li>🎨 CSS3</li>
        <li>💻 JavaScript (ES6+)</li>
      </ul>
    </div>
  );
}

export default About;