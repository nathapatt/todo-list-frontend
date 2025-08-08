import { Card, Row, Col } from "antd"
import DomeImage from "@/assets/instructors/dome.png"
import NirandImage from "@/assets/instructors/nirand.png"
// import TestNotification from "@/components/TestNotification"

const creators = [
  {
    id: 1,
    name: "Dome Potikanond",
    image: DomeImage,
  },
  {
    id: 2,
    name: "Nirand Pisutha-Arnond",
    image: NirandImage,
  },
]

const InstructorPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        {creators.map((creator) => (
          <Col key={creator.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<img alt={creator.name} src={creator.image} style={{ height: '500px', width: '100%', objectFit: 'cover' }} />}
            >
              <Card.Meta title={creator.name} style={{ textAlign: "center", marginBottom: 8 }}/>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default InstructorPage
