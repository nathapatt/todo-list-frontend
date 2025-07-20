import { Card, Row, Col } from "antd"
import MindImage from "@/assets/creators/Mind.jpg"
// import TestNotification from "@/components/TestNotification"

const creators = [
  {
    id: 1,
    name: "Nathapat Nerangsi",
    image: MindImage,
    studentId: "650610758",
  },
  // {
  //   id: 2,
  //   name: "Jane Smith",
  //   image: "https://via.placeholder.com/150",
  // },
  // {
  //   id: 3,
  //   name: "Alice Brown",
  //   image: "https://via.placeholder.com/150",
  // },
]

const CreatorPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        {creators.map((creator) => (
          <Col key={creator.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<img alt={creator.name} src={creator.image} />}
            >
              <Card.Meta title={creator.name} style={{ textAlign: "center", marginBottom: 8 }}/>
              <Card.Meta title={creator.studentId}  style={{ textAlign: "center" }} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default CreatorPage
