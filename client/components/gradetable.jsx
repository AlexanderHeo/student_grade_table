import React from 'react';
import Grade from './grade';

class Gradetable extends React.Component {

  render() {
    const grades = this.props.grades;
    if (grades.length === 0) {
      return (
        <table>
          <tbody>
            <tr>
              <td>No Student Grades Recorded</td>
            </tr>
          </tbody>
        </table>
      );
    } else {
      return (
        <div className="gradetable">
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Course</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {
                grades.map(x => {
                  return (
                    <Grade
                      key={ x.id }
                      name={ x.name }
                      course={ x.course }
                      grade= { x.grade }
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
}

export default Gradetable;
