import { faBook, faEdit, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

class Gradeform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      course: '',
      grade: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    // const currentGrades = this.props.grades;
    // const currentId = currentGrades[currentGrades.length - 1].id;
    // const nextId = (Math.round(Math.random() * 10)) + parseInt(currentId);
    this.setState({
      [name]: value
      // id: nextId
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const parsedIntGrade = parseInt(this.state.grade);
    const newStudent = {
      id: this.state.id,
      name: this.state.name,
      course: this.state.course,
      grade: parsedIntGrade
    };
    this.props.onSubmit(newStudent);
    this.setState({
      id: '',
      name: '',
      course: '',
      grade: ''
    });
  }

  handleReset() {
    this.setState({
      name: '',
      course: '',
      grade: ''
    });
  }

  incrementId(currentId) {
    const nextId = (Math.floor(Math.random() * 10)) + currentId;
    this.setState({ id: nextId });
  }

  render() {
    return (
      <div className="enter-form">
        <form onSubmit={ this.handleSubmit } onReset={ this.handleReset }>
          <div className="form-section">
            <label htmlFor="name">
              <FontAwesomeIcon icon={ faUser } size='lg' />
            </label>
            <input
              type="text"
              placeholder="name"
              name="name"
              value={ this.state.name }
              onChange={ this.handleChange }
            />
          </div>
          <div className="form-section">
            <label htmlFor="course">
              <FontAwesomeIcon icon={ faBook } size='lg' />
            </label>
            <input type="text"placeholder="course" name="course" value={ this.state.course } onChange={ this.handleChange }/>
          </div>
          <div className="form-section">
            <label htmlFor="grade">
              <FontAwesomeIcon icon={ faEdit } size='lg' />
            </label>
            <input type="number" placeholder="grade" name="grade" value={ this.state.grade } onChange={ this.handleChange }/>
          </div>
          <div>
            <div className="buttonContainer">
              <input type="submit" value="Add" className="gradeFormButton"/>
              <input type="reset" value="Cancel" className="gradeFormButton"/>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Gradeform;
