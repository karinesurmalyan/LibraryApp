import React, { useEffect, useState } from 'react';
import { Routes } from 'react-router';
import { Route } from 'react-router-dom';
import './App.css';
import { BookList } from './components/bookList/bookList';
import { BookProps, Books } from './components/bookItems/types'
import { BookPath } from './components/bookPath/bookPath';


function App() {

  const [activePage, setActivePage] = useState<number | null>(null)
  const [activeBook, setActiveBook] = useState<BookProps | null>(null)
  const [newBook, setNewBook] = useState<Books | null>(null)
  const [allBooks, setAllBooks] = useState<Books[]>([])


  useEffect(() => {
    const bookStorage = localStorage.getItem('books')
    if (bookStorage) {
      setAllBooks(prev => [...prev, ...JSON.parse(bookStorage)])
    }
  }, [])
  useEffect(() => {
    if (activePage !== null) {
      const filteredBook =  allBooks.find(book => book.id === activePage)
      setActiveBook(filteredBook || null)
    } else {
      setActiveBook(null)
    }
  }, [activePage])
  useEffect(() => {
    if (newBook !== null) {
      setAllBooks((prev) => [...prev, newBook])
    }
  }, [newBook])

  function bookSetter(book: Books) {
    const books = localStorage.getItem('books')
    if (books) {
      const booksArray = [...JSON.parse(books), book]
      localStorage.setItem('books', JSON.stringify(booksArray))
      setNewBook(book)
    } else {
      localStorage.setItem('books', JSON.stringify([book]))
      setNewBook(book)
    }
  }
//toDo: для каждого компонента свой props

  return (
    <div className="App">
      <Routes>
      <Route path="/" element={  <BookList books={allBooks} setActivePage={setActivePage} setNewBook={bookSetter}/>} />
      <Route path="/book/:id" element={ <BookPath setAllBooks={setAllBooks} id={activeBook?.id} coverImage={activeBook?.coverImage} book_title={activeBook?.book_title}
        author={activeBook?.author} description={activeBook?.description} notes={activeBook?.notes} status={activeBook?.status}
        rating={activeBook?.rating} pages_quantity={activeBook?.pages_quantity}/> } />
      </Routes>
    
    </div>
  );
}

export default App;
