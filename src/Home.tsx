import { useState, useEffect, useRef } from "react";
import { Input, Button, Card, Layout, Typography, notification, type InputRef } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { format } from "date-fns";

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

type Todo = {
  title: string;
  note: string;
  timestamp: string;
  color: string;
};

function App() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [bgColor, setBgColor] = useState("#fff9c4"); //default color
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingNote, setEditingNote] = useState("");
  const [titleError, setTitleError] = useState(false);

  const titleInputRef = useRef<InputRef>(null);

  const handleSubmit = () => {
    if (!title.trim()) {
      setTitleError(true);
      notification.error({
        message: "Title is required",
        description: "Please enter a title before adding a task.",
        placement: "topRight",
        duration: 7,
      });
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 100);
      return;
    }

    const newTodo: Todo = {
      title,
      note,
      timestamp: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      color: bgColor, 
    };
    setTodos([newTodo, ...todos]);
    setTitle("");
    setNote("");
    setBgColor("#fff9c4"); // reset สี
    setTitleError(false);
  };

  const handleDelete = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditingTitle(todos[index].title);
    setEditingNote(todos[index].note);
  };

  const handleSave = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = {
      ...updatedTodos[index],
      title: editingTitle,
      note: editingNote,
      timestamp: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    };
    setTodos(updatedTodos);
    setEditingIndex(null);
    setEditingTitle("");
    setEditingNote("");
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditingTitle("");
    setEditingNote("");
  };

  useEffect(() => {
    notification.info({
      message: "Test Notification",
      description: "If you see this, notification works.",
      duration: 7,
    });
  }, []);

const colors = [
  { name: "Yellow", value: "#fff9c4" }, // Yellow 100
  { name: "Pink", value: "#f8bbd0" },   // Pink 200
  { name: "Green", value: "#c8e6c9" },  // Green 100
  { name: "Blue", value: "#b3e5fc" },   // Light Blue 100
];

  // old colors
  // const colors = [
  //   { name: "Yellow", value: "lightyellow" },
  //   { name: "Pink", value: "#ffd6d6" },
  //   { name: "Green", value: "#d6ffd6" },
  //   { name: "Blue", value: "#d6f0ff" },
  // ];

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Content
        style={{
          padding: "48px 120px",
          backgroundColor: "#f9f9f9",
          minHeight: "calc(100vh - 128px)",
        }}
      >
        <div style={{ width: "100%", maxWidth: 1000, margin: "0 auto" }}>
          <Title level={3}>Add a Task</Title>
          <Input
            placeholder="Title*"
            value={title}
            ref={titleInputRef}
            status={titleError ? "error" : ""}
            onChange={(e) => {
              setTitle(e.target.value);
              if (titleError) setTitleError(false);
            }}
            style={{ marginBottom: 12 }}
          />
          <Input.TextArea
            placeholder="Note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            style={{ marginBottom: 12 }}
          />

          <div style={{ marginBottom: 12 }}>
            <span>Choose color: </span>
            {colors.map((c) => (
              <Button
                key={c.value}
                onClick={() => setBgColor(c.value)}
                style={{
                  background: c.value,
                  border: bgColor === c.value ? "2px solid #000" : "1px solid #ccc",
                  marginRight: 8,
                }}
              >
                {c.name}
              </Button>
            ))}
          </div>

          <Button type="primary" onClick={handleSubmit}>
            Add Task
          </Button>

{todos.length > 0 && (
  <div style={{ marginTop: 40 }}>
    <Title level={4}>Your Tasks</Title>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "16px",
      }}
    >
      {todos.map((todo, index) => (
        <Card
          key={index}
          title={
            editingIndex === index ? (
              <Input
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
              />
            ) : (
              todo.title
            )
          }
          style={{ background: todo.color }}
          bodyStyle={{ padding: 16 }}
          extra={
            editingIndex === index ? (
              <>
                <Button
                  type="link"
                  icon={<SaveOutlined />}
                  onClick={() => handleSave(index)}
                  style={{ marginRight: 8 }}
                />
                <Button
                  type="link"
                  icon={<CloseOutlined />}
                  onClick={handleCancel}
                />
              </>
            ) : (
              <>
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(index)}
                  style={{ marginRight: 8 }}
                />
                <Button
                  type="link"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(index)}
                />
              </>
            )
          }
        >
          {editingIndex === index ? (
            <Input.TextArea
              value={editingNote}
              onChange={(e) => setEditingNote(e.target.value)}
              rows={4}
              style={{ marginBottom: 12 }}
            />
          ) : (
            <>
              <Text style={{ fontSize: 16 }}>{todo.note}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>
                🕒 {todo.timestamp}
              </Text>
            </>
          )}
        </Card>
      ))}
    </div>
  </div>
)}

        </div>
      </Content>

      <Footer style={{ textAlign: "center", fontSize: 12 }}>
        Created by Nokia of Thailand
      </Footer>
    </Layout>
  );
}

export default App;
