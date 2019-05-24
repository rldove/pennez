import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStudents } from "../../actions";
import ParentEditModal from "./ParentEditModal";

class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ""
    };
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

  componentDidMount() {
    this.props.fetchStudents();
    this.getStatus();
  }
  renderStudents() {
    return this.props.students.map(student => {
      const studentId = student._id;
      return (
        <div className="card" key={student._id}>
          <div className="card-content teal-text">
            <span className="card-title">
              Student Name: {student.firstName}, {student.lastName}
            </span>
            <p>Username: {student.username}</p>
            <p>Grade Level: {student.currentGradeLevel}</p>
            <p>
              Lexile Level: {student.lexileReadingLevel} Reading Level:{" "}
              {student.readingGradeLevel}
            </p>
            <p>Student's Teacher: {student.firstName_lastName_teacher}</p>
            <p>
              School District Name: {student.schoolDistrictName}, state:{" "}
              {student.state}, zipcode: {student.zipCode}
            </p>
          </div>
          <div className="card-action">
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
              <ParentEditModal
                student={this.state[studentId]}
                studentKey={student._id}
              />
            )}
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderStudents()}</div>;
  }
}

function mapStateToProps({ students }) {
  return { students };
}

export default connect(
  mapStateToProps,
  { fetchStudents }
)(StudentList);
