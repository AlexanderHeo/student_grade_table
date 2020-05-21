import React from 'react';

class Grade extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(studentInfo, event) {
    const name = event.target.name;
    if (name === 'delete') {
      this.props.onSubmit(studentInfo);
    } else if (name === 'update') {
      this.props.onClick(studentInfo);
    }
  }

  render() {
    const student = this.props;
    const name = this.props.name;
    const course = this.props.course;
    const grade = this.props.grade;
    const studentId = this.props.id;
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
              className="btn btn-danger"
            />
            <input
              type="submit"
              name="update"
              onClick={ event => this.handleClick(student, event) }
              value="Update"
              className="btn btn-success"
            />
          </td>
        </tr>
    );
  }
}

export default Grade;
