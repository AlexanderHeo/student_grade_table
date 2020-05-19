import { faBook, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      course: '',
      grade: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

  }

  handleReset(event) {
    event.preventDefault();
    this.props.closeModal();
  }

  render() {
    const name = this.props.studentToUpgrade.name;
    const course = this.props.studentToUpgrade.course;
    const grade = this.props.studentToUpgrade.grade;
    return (
      <div className="updateModalContainer">
        <div className="updateModal">
          <div className="updateHeader">
            <div className="modalHeader">Update</div>
            <div className="updateStudentName">{name}&apos;s</div>
            <div className="modalHeader">course or grade:</div>
          </div>
          <div className="updateForm">
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
                  placeholder={ course }
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
                  placeholder={ grade }
                  name="grade"
                  value={ this.state.grade }
                  onChange={ this.handleChange }
                />
              </div>
            </form>
          </div>
          <div className="updateButtonsContainer">
            <input type="submit" value="Update" className="updateButton"/>
            <input type="submit" onClick={ this.props.closeModal } value="Cancel" className="updateButton"/>
          </div>
        </div>
      </div>
    );
  }
}

export default Update;
