const StudentItem = ({ student, onDelete }) => {
  const { id, name, score, class: studentClass } = student;

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{score}</td>
      <td>{studentClass}</td>
      <td>
        <button onClick={() => onDelete(id)}>
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default StudentItem;