import React from 'react';
import Grade from './grade';

const gradetable = props => {
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
          <tbody className="">
            {
              grades.map(x => {
                return (
                  <Grade
                    key={ x.gradeId }
                    name={ x.name }
                    course={ x.course }
                    grade={ x.grade }
                    id={ x.gradeId }
                    // onSubmit={ props.onSubmit }
                    // onClick={ () => props.onClick(x) }
                    buttonClick= { props.buttonClick }
                  />
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
};

export default gradetable;
