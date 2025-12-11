import React, { useState } from 'react';
import { Button, Modal, Form, Input, Select, Rate, InputNumber, Upload, message } from 'antd';
import { BookProps } from '../bookItems/types';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'

const { TextArea } = Input;
const { Option } = Select;

interface AddBookModalProps {
  onAddBook: (book: BookProps) => void;
}

export function AddBookModal({ onAddBook }: AddBookModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [rating, setRating] = useState(0);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setRating(0);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      onAddBook({
        ...values,
        rating: rating,
        id: Date.now()
      });
      message.success('Книга успешно добавлена!');
      setIsModalVisible(false);
      form.resetFields();
      setRating(0);
    }).catch(errorInfo => {
      console.log('Validation failed:', errorInfo);
    });
  };

  const handleImageUpload = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      form.setFieldsValue({ coverImage: info.file.response.url });
    }
  };

  return (
    <>
      <Button 
        type="primary" 
        icon={<PlusOutlined />} 
        onClick={showModal}
        style={{ marginBottom: 16 }}
      >
        Добавить книгу
      </Button>

      <Modal
        title="Добавить новую книгу"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
        okText="Добавить"
        cancelText="Отмена"
      >
        <Form
          form={form}
          layout="vertical"
          name="addBookForm"
          initialValues={{
            status: "haven't read",
            rating: 0
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <Form.Item
                name="book_title"
                label="Название книги"
                rules={[{ required: true, message: 'Пожалуйста, введите название книги' }]}
              >
                <Input placeholder="Введите название книги" />
              </Form.Item>

              <Form.Item
                name="author"
                label="Автор"
                rules={[{ required: true, message: 'Пожалуйста, введите автора' }]}
              >
                <Input placeholder="Введите автора" />
              </Form.Item>

              <Form.Item
                name="coverImage"
                label="Обложка книги"
              >
                <Upload
                  name="coverImage"
                  listType="picture"
                  accept="image/*"
                  showUploadList={true}
                  onChange={handleImageUpload}
                  beforeUpload={() => false}
                >
                  <Button icon={<UploadOutlined />}>Загрузить обложку</Button>
                </Upload>
              </Form.Item>

              <Form.Item
                name="status"
                label="Статус"
                rules={[{ required: true, message: 'Пожалуйста, выберите статус' }]}
              >
                <Select placeholder="Выберите статус">
                  <Option value="haven't read">Не читал</Option>
                  <Option value="in process">В процессе</Option>
                  <Option value="have read">Прочитано</Option>
                </Select>
              </Form.Item>
            </div>


            <div>
              <Form.Item
                name="pages_quantity"
                label="Количество страниц"
                rules={[{ required: true, message: 'Пожалуйста, введите количество страниц' }]}
              >
                <InputNumber 
                  min={1} 
                  max={5000} 
                  placeholder="Введите количество страниц" 
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item
                label="Рейтинг"
              >
                <Rate 
                  allowHalf
                  defaultValue={rating}
                  count={10} 
                  onChange={setRating}
                  style={{ fontSize: '20px' }}
                />
                <span style={{ marginLeft: 8 }}>{rating}/10</span>
              </Form.Item>

              <Form.Item
                name="description"
                label="Описание"
              >
                <TextArea 
                  rows={3} 
                  placeholder="Введите описание книги" 
                />
              </Form.Item>

              <Form.Item
                name="notes"
                label="Заметки"
              >
                <TextArea 
                  rows={2} 
                  placeholder="Введите ваши заметки о книге" 
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
}