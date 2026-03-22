import { Books, BookListProps } from '../bookItems/types';
import { bookStyles } from '../bookItems/bookStyles';
import { BookItem } from '../bookItems/bookItem';
import Input from 'antd/es/input/Input';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AddBookModal } from '../bookForm/bookForm';
import { Button, Select } from 'antd';
import { Option } from 'antd/es/mentions';


function searchFilteredBooks(books: Books[], input: string) {
  const filteredBooks = books.filter((book) => {
    return book.book_title.toLowerCase().includes(input) || book.author.toLowerCase().includes(input)}
  )
  return filteredBooks
}

function filterByStatus(books: Books[], status: string) {
  if (status==='all') return books
  return books.filter(book => book.status === status)
}

export function BookList({ books, setActivePage, onBookAdd }: BookListProps) {
  const [text, setText] = useState('')
  const [filteredBooks, setFilteredBooks] = useState(books)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    setFilteredBooks(books)
  }, [books])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  useEffect(() => {
    setFilteredBooks(searchFilteredBooks(books, text))
  }, [text])

  useEffect(() => {
    let result = books
    result = searchFilteredBooks(result, text)
    result = filterByStatus(result, statusFilter)
    setFilteredBooks(result)
  }, [text, statusFilter, books])

  return (<>
    <Input type="text" value={text} onChange={handleInputChange} placeholder="Поиск"/>
    <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 200 }}
              placeholder="Выберите статус"
            >
              <Option value="all">Все книги</Option>
              <Option value="have read">Прочитано</Option>
              <Option value="in process">В процессе</Option>
              <Option value="haven't read">Не читал</Option>
            </Select>
    <AddBookModal onAddBook={onBookAdd} />
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