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

  render() {
    return (
      <div className="sgt">
        <Header avgGrade={ this.state.avgGrade }/>
        <div className="gradetableContainer">
          <Gradetable grades={ this.state.grades }/>
          <Gradeform />
        </div>
      </div>
    );
  }
}

export default App;
