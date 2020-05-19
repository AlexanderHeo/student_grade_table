import React from 'react';

class Grade extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(studentId, event) {
    const name = event.target.name;
    if (name === 'delete') {
      this.props.onSubmit(studentId);
    } else if (name === 'update') {
      this.props.onUpdate(studentId);
    }
  }

  render() {
    const name = this.props.name;
    const course = this.props.course;
    const grade = this.props.grade;
    const studentId = this.props.studentId;
    return (
      !name
        ? <tr>
          <td>No student data available</td>
        </tr>
        : <tr>
          <td>{ name }</td>
          <td>{ course }</td>
          <td>{ grade }</td>
          <td className="operation">
            <input
              type="submit"
              name="delete"
              onClick={ event => this.handleClick(studentId, event) }
              value="Delete"
              className="deleteButton"
            />
            <input
              type="submit"
              name="update"
              onClick={ event => this.handleClick(studentId, event) }
              value="Update"
              className="updateButton"
            />
          </td>
        </tr>
    );
  }
}

export default Grade;
