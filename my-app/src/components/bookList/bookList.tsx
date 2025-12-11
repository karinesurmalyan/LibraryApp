import { Books, BookListProps } from '../bookItems/types';
import { bookStyles } from '../bookItems/bookStyles';
import { BookItem } from '../bookItems/bookItem';
import Input from 'antd/es/input/Input';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AddBookModal } from '../bookForm/bookForm';


function searchFilteredBooks(books: Books[], input: string) {
  const filteredBooks = books.filter((book) => {
    return book.book_title.toLowerCase().includes(input) || book.author.toLowerCase().includes(input)}
  )
  return filteredBooks
}

export function BookList({ books, setActivePage, setNewBook }: BookListProps) {
  const [text, setText] = useState('')
  const [filteredBooks, setFilteredBooks] = useState(books)


  useEffect(() => {
    setFilteredBooks(books)
  }, [books])
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  useEffect(() => {
    setFilteredBooks(searchFilteredBooks(books, text))
  }, [text])

  return (<>
    <Input type="text" value={text} onChange={handleInputChange}/>
    <AddBookModal onAddBook={setNewBook} />
    <div style={bookStyles.container}>
      {filteredBooks.map((book) => (
        <Link to={`/book/${book.id}`} onClick={() => setActivePage(book.id)}>
        <BookItem 
          id = {book.id}
          key={book.id}
          book_title={book.book_title}
          author={book.author}
          description={book.description}
          rating={book.rating}
          coverImage={book.coverImage}/>
        </Link>
      ))}
    </div>
  </>);
}