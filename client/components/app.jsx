import React from 'react';
import Gradetable from './gradetable';
import Header from './header';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      grades: []
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
        });
      })
      .catch(err => {
        console.error('Something went wrong:', err);
      });
  }

  render() {
    return (
      <div className="sgt">
        <Header />
        <Gradetable grades={ this.state.grades }/>
      </div>
    );
  }
}

export default App;
