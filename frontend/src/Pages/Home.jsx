import { useEffect } from "react";
import Hero from "../components/Hero/Hero";
import SearchBar from "../components/SearchBar/SearchBar";
import BookCard from "../components/BookCard/BookCard";
import CategoryCard from "../components/CategoryCard/CategoryCard";
import AuthorCard from "../components/AuthorCard/AuthorCard";

function Home() {

  useEffect(() => {
    document.title = "BookVerse | Home";
  }, []);

  return (
    <>
      <Hero />

      <SearchBar />

      {/* Featured Books */}
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        📚 Featured Books
      </h2>

      <div
        className="book-container"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        <BookCard
          title="Atomic Habits"
          author="James Clear"
          price="₹499"
        />

        <BookCard
          title="The Alchemist"
          author="Paulo Coelho"
          price="₹399"
        />

        <BookCard
          title="Rich Dad Poor Dad"
          author="Robert Kiyosaki"
          price="₹450"
        />
      </div>

      {/* Categories */}
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        📂 Categories
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        <CategoryCard name="Programming" />
        <CategoryCard name="Fiction" />
        <CategoryCard name="Science" />
        <CategoryCard name="History" />
      </div>

      {/* Popular Authors */}
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        ✍ Popular Authors
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        <AuthorCard name="James Clear" />
        <AuthorCard name="Paulo Coelho" />
        <AuthorCard name="J.K. Rowling" />
        <AuthorCard name="Robert Kiyosaki" />
      </div>

      {/* About */}
      <section
        style={{
          textAlign: "center",
          padding: "50px 20px",
        }}
      >
        <h2>About BookVerse</h2>

        <p style={{ maxWidth: "700px", margin: "20px auto" }}>
          BookVerse is an online book management system where users can
          explore books, search by title, register, login, and manage
          their reading collection. Built using React and Vite.
        </p>
      </section>
    </>
  );
}

export default Home;