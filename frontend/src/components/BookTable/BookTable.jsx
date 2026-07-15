function BookTable({ books }) {
  return (
    <table className="book-table">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Title</th>
          <th>Author</th>
          <th>Published</th>
        </tr>
      </thead>

      <tbody>
        {books.map((book, index) => (
          <tr key={book.key}>
            <td>{index + 1}</td>

            <td>{book.title}</td>

            <td>
              {book.author_name
                ? book.author_name.join(", ")
                : "Unknown"}
            </td>

            <td>
              {book.first_publish_year || "N/A"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BookTable;