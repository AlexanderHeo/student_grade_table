import React from 'react';

function Header(props) {
  return (
    <>
      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-7 col-8">
        <h1>Student Grade Table</h1>
      </div>
      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-4">
        <div className="row">
          <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-8">
            <h2>Average Grade:</h2>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 gradeBox">
            <h2>{ props.avgGrade }</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
