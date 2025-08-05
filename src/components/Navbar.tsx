import { Layout, Typography, Menu, Avatar, Space, Dropdown } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom"; // ใช้ navigate ไป login
import Logo from "@/assets/logo.png";

const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

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

        <Dropdown overlay={userMenu} trigger={['click']} placement="bottomRight">
          <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} />
        </Dropdown>
      </div>
    </Header>
  );
};

export default Navbar;
