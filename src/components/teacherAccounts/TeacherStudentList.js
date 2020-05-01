import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchStudents } from "../../actions";
import EditModal from "./EditModal";

class TeacherStudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      comment: "block"
    };
    this.checkstates = this.checkstates.bind(this);
  }
  checkstates() {
    console.log(this.props);
    console.log(this.state);
  }

  componentDidMount() {
    this.props.fetchStudents();
    this.getStatus();
  }

  getStatus() {
    setTimeout(() => {
      this.props.students.map(student => {
        this.setState({
          [student._id]: student
        });
      });
    }, 1000);
  }

  renderAllStudents() {
    return this.props.students.map(student => {
      const studentId = student._id;
      return (
        <tr key={student._id}>
          <td>
            {student.firstName} {student.lastName}
          </td>
          <td>{student.username}</td>
          <td>{student.currentGradeLevel}</td>
          <td>{student.readingGradeLevel}</td>
          <td>{student.firstName_lastName_teacher}</td>
          <td>{student.schoolDistrictName}</td>
          <td>
            State:{student.state}, {student.zipCode}
          </td>

          <td>
            {!this.state[student._id] ? (
              <div className="preloader-wrapper small active">
                <div className="spinner-layer spinner-teal-only">
                  <div className="circle-clipper left">
                    <div className="circle" />
                  </div>
                  <div className="gap-patch">
                    <div className="circle" />
                  </div>
                  <div className="circle-clipper right">
                    <div className="circle" />
                  </div>
                </div>
              </div>
            ) : (
              <EditModal
                student={this.state[studentId]}
                studentKey={student._id}
              />
            )}
          </td>
        </tr>
      );
    });
  }

  render() {
    const floatingButton = {
      margin: "50px",
      fontSize: "15px",
      textAlign: "center"
    };
    return (
      <div className="container" style={{ marginBottom: 600 }}>
        <div className="row">
          <h4 style={{ color: "teal" }}>Your Students</h4>
          <a
            href="/students/teacher"
            className="waves-effect waves-light btn-small teal lighten-2 right"
          >
            <i className="material-icons left">autorenew</i>
            Refresh
          </a>
        </div>
        <table className="highlight">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Grade Level</th>
              <th>Reading Level</th>
              <th>Student's Teacher</th>
              <th>School District</th>
              <th>Location</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>{this.renderAllStudents()}</tbody>
        </table>
        <div style={floatingButton}>
          <Link to="/legalPolicy" className="btn teal lighten-2">
            Add student
            <i className="material-icons left">add</i>
          </Link>
        </div>
        <a
          className="waves-effect waves-light btn blue lighten-3 right"
          onClick={() => this.checkstates()}
          style={{ marginTop: "100px" }}
        >
          <i className="material-icons right">grade</i>
          State
        </a>
      </div>
    );
  }
}

function mapStateToProps({ students }) {
  return { students };
}

export default connect(
  mapStateToProps,
  { fetchStudents }
)(TeacherStudentList);
