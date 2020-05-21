import { faBook, faEdit, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

class Gradeform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validInput: '',
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
    let nextId = '';
    const currentGrades = this.props.grades;
    if (currentGrades.length === 0) {
      nextId = 1;
    } else {
      const currentId = currentGrades[currentGrades.length - 1].id;
      nextId = (Math.round(Math.random() * 10)) + parseInt(currentId);
    }
    this.setState({
      [name]: value,
      id: nextId,
      validInput: false
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const parsedIntGrade = parseInt(this.state.grade);
    if (!this.state.name) {
      this.setState({
        validInput: 'name'
      });
    } else if (!this.state.course) {
      this.setState({
        validInput: 'course'
      });
    } else if (!this.state.grade) {
      this.setState({
        validInput: 'grade'
      });
    } else {
      const newStudent = {
        id: this.state.id,
        name: this.state.name,
        course: this.state.course,
        grade: parsedIntGrade
      };
      this.setState({
        id: '',
        name: '',
        course: '',
        grade: '',
        validInput: ''
      }, () => this.props.onSubmit(newStudent));
    }
  }

  handleReset() {
    this.setState({
      name: '',
      course: '',
      grade: ''
    });
  }

  render() {
    const validInput = this.state.validInput;
    return (
      <div className="col-lg-4 col-md-12 col-sm-12">
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
            <input
              type="text"
              placeholder="course"
              name="course"
              value={ this.state.course }
              onChange={ this.handleChange }
            />
          </div>
          <div className="form-section">
            <label htmlFor="grade">
              <FontAwesomeIcon icon={ faEdit } size='lg' />
            </label>
            <input
              type="number"
              placeholder="grade"
              name="grade"
              value={ this.state.grade }
              onChange={ this.handleChange }
            />
          </div>
          <div>
            {
              !validInput
                ? <div className="buttonContainer">
                  <input
                    type="submit"
                    value="Add"
                    className="btn btn-primary"
                  />
                  <input
                    type="reset"
                    value="Cancel"
                    className="btn btn-secondary"
                  />
                </div>
                : <div className="validator">
                  <div className="validatorMessage">
                    Please enter { this.state.validInput }
                  </div>
                </div>
            }
          </div>
        </form>
      </div>
    );
  }
}

export default Gradeform;
