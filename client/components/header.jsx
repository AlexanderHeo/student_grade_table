import React from 'react';

function Header(props) {
  return (
    <div className="header">
      <div className="heading">
        <h1>Student Grade Table</h1>
      </div>
      <div className="avgGradeMain">
        <div className="avgGradeContainer">
          <div className="avgGradeLabel">
            <h2>Average Grade:</h2>
          </div>
          <div className="gradeBox">
            <h2>{ props.avgGrade }</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
