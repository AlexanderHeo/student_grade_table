import { faBook, faEdit, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function Gradeform() {
  return (
    <div className="enter-form">
      <form action="submit">
        <div className="form-section">
          <label htmlFor="name">
            <FontAwesomeIcon icon={ faUser } size='lg' />
          </label>
          <input type="text" placeholder="name"/>
        </div>
        <div className="form-section">
          <label htmlFor="course">
            <FontAwesomeIcon icon={ faBook } size='lg' />
          </label>
          <input type="text"placeholder="course"/>
        </div>
        <div className="form-section">
          <label htmlFor="grade">
            <FontAwesomeIcon icon={ faEdit } size='lg' />
          </label>
          <input type="number" placeholder="grade"/>
        </div>
      </form>
      <div>
        <div className="buttonContainer">
          <button>Add</button>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Gradeform;
