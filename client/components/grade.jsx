import React from 'react';

function Grade(props) {
  const student = props.student;
  return (
    !student.name
      ? <tr>
        <td></td>
      </tr>
      : <tr>
        <td>{ student.name }</td>
        <td>{ student.course }</td>
        <td>{ student.grade }</td>
      </tr>
  );
}

export default Grade;
