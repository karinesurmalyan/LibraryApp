import React, { useState } from 'react';
import { Input, Button, Rate, message } from 'antd';
import { Books } from '../bookItems/types';

interface BookEditorProps {
  book: Books;
  onSave: (book: Books) => void;
}

export function BookEditor({ book, onSave }: BookEditorProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(book.book_title);
  const [author, setAuthor] = useState(book.author);
  const [rating, setRating] = useState(book.rating);
  const [notes, setNotes] = useState(book.notes);

  const handleSave = () => {
    const updatedBook = {
      ...book,
      book_title: title,
      author: author,
      rating: rating,
      notes: notes,
    };
    
    onSave(updatedBook);
    setEditing(false);
    message.success('Книга обновлена!');
  };

  if (!editing) {
    return (
      <div>
        <h3>{book.book_title}</h3>
        <p>{book.author}</p>
        <p>Рейтинг: {book.rating}/10</p>
        <p>{book.notes}</p>
        <Button onClick={() => setEditing(true)}>Редактировать</Button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, border: '1px solid #ccc' }}>
      <Input 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название"
        style={{ marginBottom: 10 }}
      />
      <Input 
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Автор"
        style={{ marginBottom: 10 }}
      />
      <Input 
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Заметки"
        style={{ marginBottom: 10 }}
      />
      <Rate 
        value={rating} 
        onChange={setRating}
        count={10}
        style={{ marginBottom: 10 }}
      />
      <div>
        <Button type="primary" onClick={handleSave} style={{ marginRight: 10 }}>
          Сохранить
        </Button>
        <Button onClick={() => setEditing(false)}>Отмена</Button>
      </div>
    </div>
  );
}