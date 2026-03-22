import { Card, Col, Divider, Rate, Row, Tag, Typography, Button, Popconfirm, message, Space } from 'antd';
import React, { useState } from 'react';
import { StatusType, Books, BookPathProps } from '../bookItems/types';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { BookEditor } from '../bookUpdate/bookUpdate';

const { Title, Text, Paragraph } = Typography;


export function BookPath({
  setAllBooks,
    id,
    coverImage,
    book_title,
    author,
    description,
    notes,
    status,
    rating,
    pages_quantity
}: BookPathProps) {
  const navigate = useNavigate();
  const [showBookEditor, setShowBookEditor] = useState(false);
  const handleSaveBook = (updatedBook: Books) => {
  const storedBooks = localStorage.getItem('books');

  if (storedBooks) {
    const booksArray: Books[] = JSON.parse(storedBooks);
    const updatedBooks = booksArray.map(book => 
      book.id === updatedBook.id ? updatedBook : book
    );
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    message.success('Книга успешно обновлена!');
    window.location.reload();
    }
    setShowBookEditor(false);
  };
  const bookData: Books = {
    id: id || 0,
    coverImage: coverImage || '',
    book_title: book_title || '',
    author: author || '',
    description: description || '',
    notes: notes || '',
    status: status || "haven't read",
    rating: rating || 0,
    pages_quantity: pages_quantity || 0
  };

  function deleteBook(id: number) {
    const books = localStorage.getItem('books')
    if (books) {
        const myBooks = JSON.parse(books)
        const filteredBooks = myBooks.filter((myBooks: Books) => myBooks.id !== id)
        localStorage.setItem('books', JSON.stringify(filteredBooks))
        if (setAllBooks) {
          setAllBooks(filteredBooks)
        }
        
        navigate('/')
    }
  }
    const getStatusColor = (status: StatusType): string => {
        switch (status) {
          case "have read":
            return "green";
          case "in process":
            return "blue";
          case "haven't read":
            return "red";
          default:
            return "default";
        }
    };
    
    if (showBookEditor) {
      return (
        <div style={{ margin: '20px auto', maxWidth: 800, padding: '20px', border: '1px solid #ddd' }}>
          <BookEditor 
            book={bookData}
            onSave={handleSaveBook}
          />
          <Button 
            onClick={() => setShowBookEditor(false)}
            style={{ marginTop: 10 }}
          >
            Закрыть редактор
          </Button>
        </div>
      );
    }

    return (
        <Card 
          style={{ 
            maxWidth: 800, 
            margin: '20px auto',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}
        >
        <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 1 }}>
        <Space>
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => setShowBookEditor(true)} // ← ВОТ ЗДЕСЬ!
            title="Редактировать книгу"
          />
        <Popconfirm
          title="Удаление книги"
          description="Вы уверены, что хотите удалить эту книгу?"
          okText="Да"
          cancelText="Нет"
          okType="danger"
          onConfirm={() => deleteBook(id as number)}
        >
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />}
            title="Удалить книгу"
          />
        </Popconfirm>
        </Space>
        </div>
          <Row gutter={[24, 16]}>
            <Col xs={24} sm={8} md={6}>
              <Card
                hoverable
                style={{ width: '100%' }}
                cover={
                  <img 
                    alt={book_title} 
                    src={coverImage} 
                    style={{ 
                      height: 200, 
                      objectFit: 'cover' 
                    }}
                  />
                }
              />
            </Col>
    
            <Col xs={24} sm={16} md={18}>
              <div style={{ padding: '0 16px' }}>
                <Title level={2} style={{ marginBottom: 8 }}>
                  {book_title}
                </Title>
                <Text strong style={{ fontSize: '16px', color: '#666' }}>
                  {author}
                </Text>
    
                <Divider />

                <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                  <Col>
                    <Tag 
                      color={getStatusColor(status)} 
                      style={{ fontSize: '14px', padding: '4px 12px' }}
                    >
                    </Tag>
                  </Col>
                  <Col>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Rate 
                        disabled 
                        value={rating} 
                        style={{ fontSize: '16px' }}
                      />
                      <Text strong>{rating}/10</Text>
                    </div>
                  </Col>
                  <Col>
                    <Text type="secondary">
                      {pages_quantity} стр.
                    </Text>
                  </Col>
                </Row>
                <div style={{ marginBottom: 16 }}>
                  <Title level={4}>Описание</Title>
                  <Paragraph style={{ textAlign: 'justify', lineHeight: 1.6 }}>
                    {description}
                  </Paragraph>
                </div>
    
                {notes && (
                  <div>
                    <Title level={4}>Заметки</Title>
                    <Card 
                      size="small" 
                      style={{ backgroundColor: '#f9f9f9' }}
                    >
                      <Paragraph style={{ margin: 0, fontStyle: 'italic' }}>
                        {notes}
                      </Paragraph>
                    </Card>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Card>
      );
}