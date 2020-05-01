import React from "react";
import { Link } from "react-router-dom";
import StudentList from "./parentAccounts/ParentStudentList";

const floatingButton = {
  margin: "50px",
  fontSize: "15px",
  textAlign: "center"
};

const StudentDashboard = () => {
  return (
    <div className="container" style={{ marginBottom: 800 }}>
      <div className="row">
        <h4 style={{ color: "teal" }}>Your Students</h4>
        <a
          href="/students"
          className="waves-effect waves-light btn-small teal lighten-2 right"
        >
          <i className="material-icons left">autorenew</i>
          Refresh
        </a>
      </div>

      <StudentList />
      <div style={floatingButton}>
        <Link to="/legalPolicy" className="btn teal lighten-2">
          Add student
          <i className="material-icons left">add</i>
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;
