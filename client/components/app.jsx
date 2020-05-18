import React from 'react';
import Gradeform from './gradeform';
import Gradetable from './gradetable';
import Header from './header';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      grades: [],
      avgGrade: 0
    });
    this.addNewGrade = this.addNewGrade.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
  }

  componentDidMount() {
    this.getAllGrades();
  }

  getAllGrades() {
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

  getAverageGrades(grades) {
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

  addNewGrade(newStudent) {
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
        const gradesCopy = [...this.state.grades];
        const addedNewStudent = gradesCopy.concat(jsonData);
        this.getAverageGrades(addedNewStudent);
        this.setState({
          grades: addedNewStudent
        });
      });
  }

  deleteGrade(deleteId) {
    fetch(`/api/grades/${deleteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    })
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        const gradesCopy = [...this.state.grades];
        const index = gradesCopy.findIndex(studentObj => studentObj.id === deleteId);
        gradesCopy.splice(index, 1);
        this.setState({
          grades: gradesCopy
        });
      });
  }

  render() {
    return (
      <div className="sgt">
        <Header avgGrade={ this.state.avgGrade }/>
        <div className="gradetableContainer">
          <Gradetable
            grades={ this.state.grades }
            onSubmit={ this.deleteGrade }
          />
          <Gradeform
            grades={ this.state.grades }
            onSubmit={ this.addNewGrade }/>
        </div>
      </div>
    );
  }
}

export default App;
