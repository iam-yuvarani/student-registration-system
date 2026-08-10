function Stats({ totalStudents }) {
  return (
    <div className="stats-card">
      <div className="stats-icon">👨‍🎓</div>

      <div className="stats-content">
        <h3>Total Students</h3>
        <p>{totalStudents}</p>
      </div>
    </div>
  );
}
 
export default Stats;