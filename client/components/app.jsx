import React from 'react';
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

  // componentDidUpdate() {
  //   console.log(this.state);
  // }

  getAllGrades() {
    fetch('/api/grades')
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        const grades = jsonData;
        const gradesArr = [];
        jsonData.map(x => {
          gradesArr.push(x.grade);
        });
        const avg = gradesArr.reduce((acc, cur) => {
          return acc + cur;
        });
        this.setState({
          grades: jsonData,
          avgGrade: Math.round(avg / grades.length)
        });
      });
  }

  // getAverageGrades() {
  //   const gradesArr = [];
  //   const mapped = grades.map(x => {
  //     gradesArr.push(x.grade);
  //   });
  //   const avg = gradesArr.reduce((acc, cur) => {
  //     return acc + cur;
  //   });
  //   return avg;
  // this.setState({
  //   avgGrade: [length === 0 ? 0 : { avg }]
  // });
  // }

  render() {
    return (
      <div className="sgt">
        <Header avgGrade={ this.state.avgGrade }/>
        <Gradetable grades={ this.state.grades }/>
      </div>
    );
  }
}

export default App;
