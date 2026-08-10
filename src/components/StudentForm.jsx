import { useState, useEffect } from "react";

function StudentForm({students,setStudents,editStudent,setEditStudent,}) {
  const [student, setStudent] = useState({
    name: "",
    age: "",
    department: "",
    email: "",
  });
  useEffect(() => {
  if (editStudent) {
    setStudent(editStudent);
  }
}, [editStudent]);

const handleSubmit = (e) => {
  e.preventDefault();

  if (
    !student.name ||
    !student.age ||
    !student.department ||
    !student.email
  ) {
    alert("Please fill all fields");
    return;
  }

  if (editStudent) {
    const updatedStudents = students.map((item) =>
      item.id === editStudent.id ? student : item
    );

    setStudents(updatedStudents);
    setEditStudent(null);
  } else {
    const newStudent = {
      id: Date.now(),
      ...student,
    };

    setStudents([...students, newStudent]);
  }

  setStudent({
    name: "",
    age: "",
    department: "",
    email: "",
  });
};
  return (
    <div className="form-card">
      <h2>{editStudent ? "Edit Student" : "Add New Student"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student Name</label>
          <input
            type="text"
            placeholder="Enter student name"
            value={student.name}
            onChange={(e) =>
              setStudent({ ...student, name: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            placeholder="Enter age"
            value={student.age}
            onChange={(e) =>
              setStudent({ ...student, age: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            placeholder="Enter department"
            value={student.department}
            onChange={(e) =>
              setStudent({
                ...student,
                department: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={student.email}
            onChange={(e) =>
              setStudent({
                ...student,
                email: e.target.value,
              })
            }
          />
        </div>

       <button type="submit" className="add-btn">
  {editStudent ? "Update Student" : "Add Student"}
</button>
      </form>
    </div>
  );
}

export default StudentForm;