"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface Book {
  id: string;
  title: string;
  date: string;
  checked: boolean;
}

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const router = useRouter();
  //get all books
  useEffect(() => {
    const getBooks = async () => {
      const response = await fetch("api/get-books");
      const data = await response.json();
      setBooks(data);
    };

    getBooks();
  }, []);

  const handleCheck = (index: number) => {
    const updatedBooks = [...books];
    updatedBooks[index].checked = !updatedBooks[index].checked;
    setBooks(updatedBooks);
  };

  const handleEdit = async (book: Book) => {
    router.push(`/books/edit?id=${book.id}`);
  };

  const handleDelete = async (book: Book) => {
    try {
      const response = await fetch(`/api/delete-books/${book.id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        alert("Book deletes successfully");
        setBooks(
          books.filter((book: Book) => {
            book.id != data.id;
          })
        );
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto text-center">
      <h1 className="text-3xl font-bold mt-20">Books List</h1>
      <ul className="flex flex-col">
        {books.length === 0 && (
          <p className="text-2xl mt-10">No books to show.</p>
        )}
        {books.map((book: Book, index: number) => (
          <div
            key={book.id}
            className="text-2xl max-w-xl flex items-center bg-gray-100 p-3 rounded-lg gap-4 my-10"
          >
            <input type="checkbox" onClick={() => handleCheck(index)} />
            <li className="font-bold" key={book.id}>
              {book.title}
            </li>
            <li>{book.date}</li>

            <button
              className=" text-xs text-gray-900 leading-7 hover:text-gray-900/70"
              disabled={!book.checked}
              onClick={() => handleDelete(book)}
            >
              {book.checked ? "Delete" : ""}
            </button>
            <button
              disabled={!book.checked}
              className="text-xs text-gray-900 hover:text-gray-900/70"
              onClick={() => handleEdit(book)}
            >
              {book.checked ? "Edit Book" : ""}
            </button>
          </div>
        ))}
      </ul>
      <div>
        <button
          className="text-gray-900 leading-7 mt-4 underline hover:text-gray-900/70"
          onClick={() => router.push("/create-post")}
        >
          Create New Book
        </button>
      </div>
    </div>
  );
};

export default BooksPage;
