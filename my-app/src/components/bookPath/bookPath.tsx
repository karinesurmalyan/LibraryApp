import { Card, Col, Divider, Rate, Row, Tag, Typography, Button, Popconfirm } from 'antd';
import React from 'react';
import { StatusType, Books, BookPathProps } from '../bookItems/types';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

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
  function deleteBook(id: number) {
    const books = localStorage.getItem('books')
    if (books) {
        const myBooks = JSON.parse(books)
        const filteredBooks = myBooks.filter((myBooks: Books) => myBooks.id !== id)
        localStorage.setItem('books', JSON.stringify(filteredBooks))
        setAllBooks(filteredBooks)
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
    return (
        <Card 
          style={{ 
            maxWidth: 800, 
            margin: '20px auto',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}
        >
        <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 1 }}>
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
                      <Text strong>{rating}/5</Text>
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
                    <Title level={4}>My Notes</Title>
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