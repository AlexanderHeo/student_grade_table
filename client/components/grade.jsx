import React from 'react';

const grade = props => {
  const studentId = props.id;
  const student = props;
  const name = props.name;
  const course = props.course;
  const grade = props.grade;
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
            onClick={ event => props.buttonClick(event, studentId) }
            value="Delete"
            className="btn btn-danger"
          />
          <input
            type="submit"
            name="update"
            onClick={ event => props.buttonClick(event, student) }
            value="Update"
            className="btn btn-success"
          />
        </td>
      </tr>
  );
};

export default grade;
