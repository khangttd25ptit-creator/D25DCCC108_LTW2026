import { useState } from "react";
import StudentList from "./components/StudentList";
import "./App.css";

const App = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      score: 9,
      class: "D25DCC01",
    },
    {
      id: 2,
      name: "Nguyễn Văn B",
      score: 7,
      class: "D25DCC02",
    },
    {
      id: 3,
      name: "Nguyễn Văn C",
      score: 4.5,
      class: "D25DCC01",
    },
  ]);

  const [filter, setFilter] = useState("all");

  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [error, setError] = useState("");

  const filteredStudents = students.filter((student) => {
    if (filter === "good") {
      return student.score >= 8;
    }

    if (filter === "fail") {
      return student.score < 5;
    }

    return true;
  });

  const handleAddStudent = (event) => {
    event.preventDefault();

    const studentScore = Number(score);

    if (
      name.trim() === "" ||
      score === "" ||
      studentClass.trim() === ""
    ) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (studentScore < 0 || studentScore > 10) {
      setError("Điểm phải từ 0 đến 10!");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      score: studentScore,
      class: studentClass.trim(),
    };

    setStudents([...students, newStudent]);

    setName("");
    setScore("");
    setStudentClass("");
    setError("");
  };

  const handleDeleteStudent = (id) => {
    setStudents(
      students.filter((student) => student.id !== id)
    );
  };
  
  const totalStudents = students.length;

  const averageScore =
    students.length > 0
      ? students.reduce(
          (total, student) => total + student.score,
          0
        ) / students.length
      : 0;

  return (
    <div className="container">
      <h1>QUẢN LÝ ĐIỂM SINH VIÊN</h1>

      <form onSubmit={handleAddStudent}>
        <h2>Thêm sinh viên</h2>

        <input
          type="text"
          placeholder="Họ tên"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          type="number"
          placeholder="Điểm số"
          min="0"
          max="10"
          step="0.1"
          value={score}
          onChange={(event) => setScore(event.target.value)}
        />

        <input
          type="text"
          placeholder="Lớp"
          value={studentClass}
          onChange={(event) =>
            setStudentClass(event.target.value)
          }
        />

        <button type="submit">
          Thêm sinh viên
        </button>

        {error && <p className="error">{error}</p>}
      </form>

      <div className="filter">
        <button onClick={() => setFilter("all")}>
          Tất cả
        </button>

        <button onClick={() => setFilter("good")}>
          Giỏi (≥ 8)
        </button>

        <button onClick={() => setFilter("fail")}>
          Trượt (&lt; 5)
        </button>
      </div>

      <StudentList
        students={filteredStudents}
        onDelete={handleDeleteStudent}
      />

      <div className="statistics">
        <h2>Thống kê</h2>

        <p>
          Tổng số sinh viên: {totalStudents}
        </p>

        <p>
          Điểm trung bình: {averageScore.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default App;
