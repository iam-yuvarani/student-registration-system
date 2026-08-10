import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";
import SearchBar from "../components/SearchBar";
import Stats from "../components/Stats";
import Pagination from "../components/Pagination";
import "../assets/style.css";
 
function Home() {
  const [students, setStudents] = useState(() => {

    const savedStudents = localStorage.getItem("students");

    return savedStudents ? JSON.parse(savedStudents) : [];
  });
  const [editStudent, setEditStudent] = useState(null);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const studentsPerPage = 5;

  useEffect(() => {

    localStorage.setItem("students", JSON.stringify(students));

  }, [students]);

  const deleteStudent = (id) => {

    const confirmDelete = window.confirm(

      "Are you sure you want to delete this student?"
    );

    if (confirmDelete) {

      setStudents(students.filter((student) => student.id !== id));
    }
  };

  const sortStudents = () => {

    const sortedStudents = [...students].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    setStudents(sortedStudents);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  const lastStudentIndex = currentPage * studentsPerPage;
  const firstStudentIndex = lastStudentIndex - studentsPerPage;

  const currentStudents = filteredStudents.slice(
    firstStudentIndex,
    lastStudentIndex
  );

  return (
    <>
      <Navbar />

      <div className="container">
        <Stats totalStudents={students.length} />

        <SearchBar
          search={search}
          setSearch={setSearch}
          sortStudents={sortStudents}
        />

        <StudentForm
          students={students}
          setStudents={setStudents}
          editStudent={editStudent}
          setEditStudent={setEditStudent}
        />

        <StudentTable
          students={currentStudents}
          deleteStudent={deleteStudent}
          setEditStudent={setEditStudent}
        />

        <Pagination
          totalStudents={filteredStudents.length}
          studentsPerPage={studentsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
}

export default Home;