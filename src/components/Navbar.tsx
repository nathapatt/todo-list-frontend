import { Layout, Typography, Menu, Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom"; // 👈 import Link
import Logo from "@/assets/logo.png";

const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
  return (
    <Header
      style={{
        background: "#ffffff",
        padding: "0 40px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Space>
        <img src={Logo} alt="Logo" style={{ height: 40 }} />
        <Title level={2} style={{ margin: 0, lineHeight: "64px" }}>
          Todo App
        </Title>
      </Space>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Menu
          mode="horizontal"
          selectable={false}
          //   overflowedIndicator={null}
          style={{
            flex: "none",
            borderBottom: "none",
          }}
        >
          <Menu.Item key="main">
            <Link to="/">Main</Link>
          </Menu.Item>
          <Menu.Item key="creator">
            <Link to="/creator">Creator</Link>
          </Menu.Item>
          <Menu.Item key="instructor">
            <Link to="/instructor">Instructor</Link>
          </Menu.Item>
        </Menu>

        <Avatar icon={<UserOutlined />} />
      </div>
    </Header>
  );
};

export default Navbar;
