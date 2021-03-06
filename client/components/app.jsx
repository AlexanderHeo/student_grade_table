import React, { Component } from 'react';
import Gradeform from './gradeform';
import Gradetable from './gradetable';
import Header from './header';
import Update from './update';

class App extends Component {
state = {
  grades: [],
  avgGrade: 0,
  updating: false,
  studentToUpdate: {}
};

componentDidMount() {
  this.getAllGrades();
}

getAllGrades = () => {
  fetch('/api/grades')
    .then(response => {
      return response.json();
    })
    .then(jsonData => {
      this.setState({
        grades: jsonData
      }, () => { this.getAverageGrades(jsonData); });
    });
}

getAverageGrades = grades => {
  if (grades.length === 0) {
    this.setState({ avgGrade: 'N/A' });
  } else if (grades.length === 1) {
    this.setState({ avgGrade: grades[0].grade });
  } else {
    const gradesArr = [];
    grades.map(x => {
      gradesArr.push(x.grade);
    });
    const avg = gradesArr.reduce((acc, cur) => {
      return acc + cur;
    });
    this.setState({
      avgGrade: Math.round(avg / gradesArr.length)
    });
  }
}

addNewGrade = newStudent => {
  fetch('/api/grades', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newStudent)
  })
    .then(response => {
      return response.json();
    })
    .then(jsonData => {
      let addedNewStudent = [];
      const gradesCopy = [...this.state.grades];
      if (gradesCopy.length === 0) {
        addedNewStudent.push(jsonData);
      } else {
        addedNewStudent = gradesCopy.concat(jsonData);
      }
      this.getAverageGrades(addedNewStudent);
      this.setState({ grades: addedNewStudent });
    });
}

deleteGrade = deleteId => {
  fetch(`/api/grades/${deleteId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => null)
    .then(jsonData => {
      const gradesCopy = [...this.state.grades];
      const index = gradesCopy.findIndex(studentObj => studentObj.gradeId === deleteId);
      gradesCopy.splice(index, 1);
      this.setState({ grades: gradesCopy },
        () => {
          this.getAverageGrades(gradesCopy);
        });
      return jsonData;
    })
    .catch(err => console.error(err));
}

showModal = studentToUpdate => {
  this.setState({
    updating: true,
    studentToUpdate: studentToUpdate
  });
}

closeModal = () => {
  this.setState({ updating: false });
}

updateGrade = updateStudent => {
  const updateId = updateStudent.id;
  fetch(`/api/grades/${updateId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateStudent)
  })
    .then(response => response.json())
    .then(jsonData => {
      const gradesCopy = [...this.state.grades];
      const index = gradesCopy.findIndex(studentObj => {
        return studentObj.gradeId === updateId;
      });
      gradesCopy.splice(index, 1, jsonData);
      this.setState({
        grades: gradesCopy,
        updating: false
      }, () => { this.getAverageGrades(gradesCopy); });
    });
}

handleClick = (event, studentInfo) => {
  const name = event.target.name;
  if (name === 'delete') {
    this.deleteGrade(studentInfo);
  } else if (name === 'update') {
    this.showModal(studentInfo);
  }
}

render() {
  return (
    <div className="container-fluid">
      <div className="row">
        {
          this.state.updating
            ? <Update
              studentToUpgrade={ this.state.studentToUpdate }
              closeModal={ this.closeModal }
              onSubmit={ this.updateGrade }
              onClick={ this.updateGrade }
            />
            : null
        }
      </div>
      <Header avgGrade={ this.state.avgGrade }/>
      <div className="row gradetableform">
        <Gradetable
          grades={ this.state.grades }
          // onSubmit={ this.deleteGrade }
          // onClick={ this.showModal }
          buttonClick={ this.handleClick }
        />
        <Gradeform
          grades={ this.state.grades }
          onSubmit={ this.addNewGrade }
        />
      </div>
    </div>
  );
}
}

export default App;
