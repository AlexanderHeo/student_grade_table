import { faBook, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notValidInput: '',
      id: this.props.studentToUpgrade.gradeId,
      name: this.props.studentToUpgrade.name,
      course: this.props.studentToUpgrade.course,
      grade: this.props.studentToUpgrade.grade
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
      notValidInput: ''
    });
  }

  handleSubmit(event, student) {
    event.preventDefault();
    if (!this.state.course) {
      this.setState({
        notValidInput: 'course'
      });
    } else if (!this.state.grade) {
      this.setState({
        notValidInput: 'grade'
      });
    } else if (this.state.course && this.state.grade) {
      const updatedStudent = {
        gradeId: this.state.id,
        name: this.state.name,
        course: this.state.course,
        grade: parseInt(this.state.grade)
      };
      this.setState({
        course: '',
        grade: ''
      }, () => this.props.onSubmit(updatedStudent));
    }

    // if (!this.state.course && !this.state.grade) {
    //   updateCourse = this.props.studentToUpgrade.course;
    //   const parsedIntGrade = parseInt(this.props.studentToUpgrade.grade);
    //   const updatedStudent = {
    //     id: this.state.id,
    //     name: this.state.name,
    //     course: updateCourse,
    //     grade: parsedIntGrade
    //   };
    //   this.setState({
    //     course: '',
    //     grade: ''
    //   }, () => this.props.onSubmit(updatedStudent));
    // } else if (this.state.course && !this.state.grade) {
    //   this.setState({
    //     notValidInput: true
    //   });
    // } else {
    //   updateCourse = this.props.studentToUpgrade.course;
    //   const parsedIntGrade = parseInt(this.props.studentToUpgrade.grade);
    //   const updatedStudent = {
    //     id: this.state.id,
    //     name: this.state.name,
    //     course: updateCourse,
    //     grade: parsedIntGrade
    //   };
    //   this.setState({
    //     course: '',
    //     grade: ''
    //   }, () => this.props.onSubmit(updatedStudent));
    // }
  }

  handleReset(event) {
    event.preventDefault();
    this.props.closeModal();
  }

  render() {
    const student = this.props.studentToUpgrade;
    const name = this.props.studentToUpgrade.name;
    const notValidInput = this.state.notValidInput;
    return (
      <div className="updateModalContainer d-flex">
        <div className="updateModal">
          <div className="updateHeader d-flex flex-column">
            <div className="modalHeader">Update</div>
            <div className="updateStudentName"><span>{name}&apos;s</span></div>
            <div className="modalHeader">course or grade:</div>
          </div>
          <div className="updateForm mt-4">
            <form
              action="submit"
              onSubmit={ this.handleSubmit }
              onReset={ this.handleReset }
              className="modalForm"
            >
              <div className="form-section">
                <label htmlFor="course">
                  <FontAwesomeIcon icon={ faBook } size="lg" />
                </label>
                <input
                  type="text"
                  // placeholder={ course }
                  name="course"
                  value={ this.state.course }
                  onChange={ this.handleChange }
                />
              </div>
              <div className="form-section">
                <label htmlFor="grade">
                  <FontAwesomeIcon icon={ faEdit } size="lg" />
                </label>
                <input
                  type="number"
                  // placeholder={ grade }
                  name="grade"
                  value={ this.state.grade }
                  onChange={ this.handleChange }
                />
              </div>
            </form>
          </div>
          <div className="updateButtonsContainer d-flex mt-4">
            {
              !notValidInput
                ? <div>
                  <input
                    type="submit"
                    onClick={event => this.handleSubmit(event, student)}
                    value="Update"
                    className="btn btn-success"
                  />
                  <input
                    type="submit"
                    onClick={this.props.closeModal}
                    value="Cancel"
                    className="btn btn-secondary"
                  />
                </div>
                : <div className="validator">
                  <div className="validatorMessage">
                    {`Please enter a ${this.state.notValidInput}:`}
                  </div>
                </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Update;
