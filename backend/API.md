# BookVerse Backend API

## Base URL

http://localhost:5000

---

## GET /books

Returns all books.

---

## GET /books/:id

Returns one book.

Example:

GET /books/1

---

## POST /books

Adds a new book.

Body:

```json
{
  "title": "Java",
  "author": "James",
  "price": 600
}
```

---

## PUT /books/:id

Updates a book.

---

## DELETE /books/:id

Deletes a book.

---

## GET /books/search?title=react

Search books by title.