import React from 'react';

function Grade(props) {
  const student = props.student;
  return (
    <tr key={ student.id }>
      <td>{ student.name }</td>
      <td>{ student.course }</td>
      <td>{ student.grade }</td>
    </tr>
  );
}

export default Grade;
