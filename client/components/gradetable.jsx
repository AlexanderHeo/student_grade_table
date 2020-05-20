import React from 'react';
import Grade from './grade';

function Gradetable(props) {
  const grades = props.grades;
  if (grades.length === 0) {
    return (
      <table className="col-8">
        <tbody>
          <tr>
            <td>No Student Grades Recorded</td>
          </tr>
        </tbody>
      </table>
    );
  } else {
    return (
      <div className="col-lg-8 col-md-12 col-sm-12 gradetable">
        <table className="">
          <thead className="col-12">
            <tr className="">
              <th>Student Name</th>
              <th>Course</th>
              <th>Grade</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody className="col-12">
            {
              grades.map(x => {
                return (
                  <Grade
                    key={ x.id }
                    name={ x.name }
                    course={ x.course }
                    grade={ x.grade }
                    onSubmit={ props.onSubmit }
                    id={ x.id }
                    onClick={ () => props.onClick(x) }
                  />
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default Gradetable;
