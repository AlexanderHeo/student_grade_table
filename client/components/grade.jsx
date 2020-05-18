import React from 'react';

function Grade(props) {
  const name = props.name;
  const course = props.course;
  const grade = props.grade;
  const deleteId = props.deleteId;
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
            onClick={ () => props.onSubmit(deleteId) }
            value="Delete"
            className="deleteButton"
          />
        </td>
      </tr>
  );
}

export default Grade;
