import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi } from '@/api/authApi';
import { Input, Button, notification, Card, Typography } from 'antd';

const { Title } = Typography;

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    let hasError = false;
    setLoginFailed(false); // reset ทุกครั้งก่อน login

    if (!email.trim()) {
      setEmailError(true);
      notification.error({ message: 'กรุณากรอกอีเมล' });
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError(true);
      notification.error({
        message: 'อีเมลไม่ถูกต้อง',
        description: 'กรุณากรอกอีเมลในรูปแบบ เช่น example@example.com',
      });
      hasError = true;
    } else {
      setEmailError(false);
    }

    if (!password.trim()) {
      setPasswordError(true);
      notification.error({ message: 'กรุณากรอกรหัสผ่าน' });
      hasError = true;
    } else {
      setPasswordError(false);
    }

    if (hasError) return;

    try {
      const response = await loginApi(email, password);
      const token = response.access_token;

      if (!token) {
        notification.error({ message: 'Login failed: token not found' });
        setLoginFailed(true);
        return;
      }

      localStorage.setItem('access_token', token);
      if (response.name) {
        localStorage.setItem('user_name', response.name);
      }
      notification.success({ message: 'Login Success!' });
      navigate('/');
    } catch {
      setLoginFailed(true);
      notification.error({ message: 'เข้าสู่ระบบไม่สำเร็จ', description: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
    }
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to bottom right, #f0f0f0, #fafafa)'
    }}>
      <Card
        style={{
          width: 350,
          padding: 24,
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          background: 'rgba(255, 255, 255, 0.7)'
        }}
      >
        <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>Login</Title>

        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(false);
            setLoginFailed(false);
          }}
          status={emailError || loginFailed ? "error" : ""}
          style={{ marginBottom: 16 }}
        />

        <Input.Password
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(false);
            setLoginFailed(false);
          }}
          status={passwordError || loginFailed ? "error" : ""}
          style={{ marginBottom: 24 }}
        />

        <Button type="primary" block onClick={handleLogin}>Login</Button>

        <div style={{ marginTop: 16, textAlign: "center" }}>
          <span>Don't have an account? </span>
          <Link to="/register">Register</Link>
        </div>
      </Card>
    </div>
  );
}

export default LoginPage;
