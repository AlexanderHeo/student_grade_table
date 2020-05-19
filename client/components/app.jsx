import React from 'react';
import Gradeform from './gradeform';
import Gradetable from './gradetable';
import Header from './header';
import Update from './update';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      grades: [],
      avgGrade: 0,
      updating: false,
      studentToUpdate: {}
    });
    this.addNewGrade = this.addNewGrade.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateGrade = this.updateGrade.bind(this);
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
    if (grades.length === 0) {
      this.setState({ avgGrade: 'N/A' });
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
        }, () => { this.getAverageGrades(gradesCopy); });
      });
  }

  showModal(studentToUpdate) {
    this.setState({
      updating: true,
      studentToUpdate: studentToUpdate
    });
  }

  closeModal() {
    this.setState({
      updating: false
    });
  }

  updateGrade(updateStudent) {
    const updateId = updateStudent.id;
    fetch(`/api/grades/${updateId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateStudent)
    })
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        const gradesCopy = [...this.state.grades];
        const index = gradesCopy.findIndex(studentObj => studentObj.id === updateId);
        gradesCopy.splice(index, 1, jsonData);
        this.setState({
          grades: gradesCopy,
          updating: false
        }, () => { this.getAverageGrades(gradesCopy); });
      });
  }

  render() {
    return (
      <div className="sgt">
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
        <Header avgGrade={ this.state.avgGrade }/>
        <div className="gradetableContainer">
          <Gradetable
            grades={ this.state.grades }
            onSubmit={ this.deleteGrade }
            onClick={ this.showModal }
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
