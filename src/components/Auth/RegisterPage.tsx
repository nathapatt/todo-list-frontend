import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input, Button, Card, Typography, notification } from 'antd';
import { registerApi } from '@/api/authApi';

const { Title } = Typography;

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string) =>
    /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  const handleRegister = async () => {
    let hasError = false;

    if (!name.trim()) {
      setNameError(true);
      notification.error({ message: 'กรุณากรอกชื่อ' });
      hasError = true;
    } else {
      setNameError(false);
    }

    if (!email.trim()) {
      setEmailError(true);
      notification.error({ message: 'กรุณากรอกอีเมล' });
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError(true);
      notification.error({
        message: 'รูปแบบอีเมลไม่ถูกต้อง',
        description: 'กรุณาใช้รูปแบบอีเมล เช่น example@example.com',
      });
      hasError = true;
    } else {
      setEmailError(false);
    }

    if (!password.trim()) {
      setPasswordError(true);
      notification.error({ message: 'กรุณากรอกรหัสผ่าน' });
      hasError = true;
    } else if (!validatePassword(password)) {
      setPasswordError(true);
      notification.error({
        message: 'รหัสผ่านไม่ปลอดภัย',
        description: 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัว มีตัวพิมพ์ใหญ่ 1 ตัว และมีตัวเลขอย่างน้อย 1 ตัว',
      });
      hasError = true;
    } else {
      setPasswordError(false);
    }

    if (hasError) return;

    try {
      await registerApi(email, password, name);
      notification.success({ message: 'สมัครสมาชิกสำเร็จ!' });
      navigate('/login');
    } catch {
      notification.error({ message: 'สมัครสมาชิกไม่สำเร็จ' });
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
          width: 400,
          padding: 24,
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          background: 'rgba(255, 255, 255, 0.7)'
        }}
      >
        <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>Register</Title>

        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (nameError) setNameError(false);
          }}
          status={nameError ? "error" : ""}
          style={{ marginBottom: 16 }}
        />

        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError(false);
          }}
          status={emailError ? "error" : ""}
          style={{ marginBottom: 16 }}
        />

        <Input.Password
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordError) setPasswordError(false);
          }}
          status={passwordError ? "error" : ""}
          style={{ marginBottom: 24 }}
        />

        <Button type="primary" block onClick={handleRegister}>Register</Button>

        <div style={{ marginTop: 16, textAlign: "center" }}>
          <span>Already have an account? </span>
          <Link to="/login">Login</Link>
        </div>
      </Card>
    </div>
  );
}

export default RegisterPage;
