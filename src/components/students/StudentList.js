import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStudents } from "../../actions";

class StudentList extends Component {
  componentDidMount() {
    this.props.fetchStudents();
  }
  renderStudents() {
    return this.props.students.map(student => {
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
            <a>Edit Profile</a>
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
