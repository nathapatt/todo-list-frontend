import { useState, useEffect, useRef } from "react";
import {
  Input,
  Button,
  Card,
  Layout,
  Typography,
  notification,
  Modal,
  DatePicker,
  Select,
  Space,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { format } from "date-fns";
import type { InputRef } from "antd";
import type { Dayjs } from "dayjs";
import axios from "axios";

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

type Todo = {
  id: string;
  title: string;
  note: string;
  timestamp: string;
  color: string;
};

function App() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [bgColor, setBgColor] = useState("#fff9c4");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingNote, setEditingNote] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [timeSort, setTimeSort] = useState<"asc" | "desc" | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const titleInputRef = useRef<InputRef>(null);

  const colors = [
    { name: "Yellow", value: "#fff9c4" },
    { name: "Pink", value: "#f8bbd0" },
    { name: "Green", value: "#c8e6c9" },
    { name: "Blue", value: "#b3e5fc" },
  ];

  useEffect(() => {
    const savedToken = localStorage.getItem('access_token');
    if (savedToken) {
      setToken(savedToken);
    } else {
      // redirect ไปหน้า Login ถ้ายังไม่มี Token
      window.location.href = '/login';
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    console.log("Saved token:", token);


    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/todos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTodos(response.data);
      } catch (error) {
        console.error("Failed to fetch todos", error);
      }
    };

    fetchTodos();
  }, [token]);

  const handleSubmit = async () => {
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

    try {
      const response = await axios.post(
        "http://localhost:3000/todos",
        {
          title,
          note,
          timestamp: new Date().toISOString(),
          color: bgColor,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos([response.data, ...todos]);
      setTitle("");
      setNote("");
      setBgColor("#fff9c4");
      setTitleError(false);
    } catch (error) {
      console.error("Failed to create todo", error);
    }
  };

  const handleDelete = async (index: number) => {
    const todoToDelete = todos[index];
    try {
      await axios.delete(`http://localhost:3000/todos/${todoToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(todos.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditingTitle(todos[index].title);
    setEditingNote(todos[index].note);
  };

  const handleSave = async (index: number) => {
    const todoToUpdate = todos[index];
    try {
      const response = await axios.put(
        `http://localhost:3000/todos/${todoToUpdate.id}`,
        {
          title: editingTitle,
          note: editingNote,
          timestamp: new Date().toISOString(),
          color: todoToUpdate.color,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedTodos = [...todos];
      updatedTodos[index] = response.data;
      setTodos(updatedTodos);
      setEditingIndex(null);
      setEditingTitle("");
      setEditingNote("");
    } catch (error) {
      console.error("Failed to update todo", error);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditingTitle("");
    setEditingNote("");
  };

  let filteredAndSortedTodos = [...todos];

  if (selectedDate) {
    const selectedStr = selectedDate.format("YYYY-MM-DD");
    filteredAndSortedTodos = filteredAndSortedTodos.filter((todo) =>
      todo.timestamp.startsWith(selectedStr)
    );
  }

  if (selectedColor) {
    filteredAndSortedTodos = filteredAndSortedTodos.filter(
      (todo) => todo.color === selectedColor
    );
  }

  if (timeSort) {
    filteredAndSortedTodos.sort((a, b) => {
      const t1 = new Date(a.timestamp).getTime();
      const t2 = new Date(b.timestamp).getTime();
      return timeSort === "asc" ? t1 - t2 : t2 - t1;
    });
  }

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
                  border:
                    bgColor === c.value ? "2px solid #000" : "1px solid #ccc",
                  marginRight: 8,
                }}
              >
                {c.name}
              </Button>
            ))}
          </div>

          <Button type="primary" onClick={handleSubmit} disabled={!token}>
            Add Task
          </Button>

          {todos.length > 0 && (
            <div style={{ marginTop: 40 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <Title level={4} style={{ margin: 0 }}>
                  Your Tasks
                </Title>
                <Button onClick={() => setIsFilterModalVisible(true)}>
                  Filter
                </Button>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                  gap: "16px",
                  marginTop: 20,
                }}
              >
                {filteredAndSortedTodos.map((todo, index) => (
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
                          🕒 {format(new Date(todo.timestamp), "yyyy-MM-dd HH:mm")}
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

      <Modal
        title="Filter Tasks"
        open={isFilterModalVisible}
        onCancel={() => setIsFilterModalVisible(false)}
        onOk={() => setIsFilterModalVisible(false)}
        footer={[
          <Button
            key="reset"
            onClick={() => {
              setSelectedDate(null);
              setTimeSort(null);
              setSelectedColor(null);
              setIsFilterModalVisible(false);
            }}
          >
            Reset
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => setIsFilterModalVisible(false)}
          >
            Apply
          </Button>,
        ]}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <div>
            <Text strong>Select Date:</Text>
            <br />
            <DatePicker
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <Text strong>Sort by Time:</Text>
            <br />
            <Select
              value={timeSort}
              onChange={(value) => setTimeSort(value)}
              allowClear
              placeholder="Sort by time"
              style={{ width: "100%" }}
            >
              <Select.Option value="asc">Ascending (Old → New)</Select.Option>
              <Select.Option value="desc">
                Descending (New → Old)
              </Select.Option>
            </Select>
          </div>

          <div>
            <Text strong>Filter by Color:</Text>
            <br />
            <Select
              value={selectedColor || undefined}
              onChange={(value) => setSelectedColor(value)}
              allowClear
              placeholder="Select color"
              style={{ width: "100%" }}
            >
              {colors.map((c) => (
                <Select.Option key={c.value} value={c.value}>
                  {c.name}
                </Select.Option>
              ))}
            </Select>
          </div>
        </Space>
      </Modal>
    </Layout>
  );
}

export default App;
