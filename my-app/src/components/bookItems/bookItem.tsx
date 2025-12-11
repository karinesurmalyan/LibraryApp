import { Card, Rate, Typography, Space, Image } from "antd";
import { bookStyles } from "./bookStyles";
import { BookItemProp, Books} from "./types";


const { Title, Text, Paragraph } = Typography;

export function BookItem({
    id,
    book_title,
    author,
    description,
    rating,
    coverImage
}: BookItemProp) {
    return (
        <Card
            hoverable
            cover={
                coverImage ? (
                    <Image
                        alt={book_title}
                        src={coverImage}
                        height={200}
                        style={{ objectFit: "cover" }}
                        preview={false}
                    />
                ) : (
                    <div style={bookStyles.coverPlaceholder}>
                        <Text type="secondary">Нет обложки</Text>
                    </div>
                )
            }
            style={bookStyles.card}
            bodyStyle={bookStyles.cardBody}
        >
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
                <Title level={4} style={bookStyles.title}>
                    {book_title}
                </Title>

                <Text type="secondary" style={bookStyles.author}>
                    {author}
                </Text>

                <Rate
                    allowHalf
                    defaultValue={rating}
                    count={10}
                    style={bookStyles.rate}
                    disabled
                />

                <Paragraph
                    ellipsis={{ rows: 2, expandable: true, symbol: "развернуть" }}
                    style={bookStyles.description}
                >
                    {description}
                </Paragraph>
            </Space>
        </Card>
    );
}