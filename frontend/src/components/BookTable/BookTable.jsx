import "./BookTable.css";

function BookTable({ books }) {
  return (
    <table className="book-table">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Title</th>
          <th>Author</th>
          <th>Price</th>
        </tr>
      </thead>

      <tbody>
        {books.map((book, index) => (
          <tr key={book._id}>
            <td>{index + 1}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>₹{book.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BookTable;