import React from 'react';

function Grade(props) {
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
      </tr>
  );
}

export default Grade;
