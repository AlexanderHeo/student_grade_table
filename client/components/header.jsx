import React from 'react';

function Header(props) {
  return (
    <div className="row header">
      <div className="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-12 headerxs d-flex">
        <h1>Student Grade Table</h1>
      </div>
      <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-12 headerxs d-flex">
        <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-3 averageGrade d-flex">
          <h2>Average Grade:</h2>
        </div>
        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-1 badge d-flex">
          <h2>{ props.avgGrade }</h2>
        </div>
      </div>
    </div>
  );
}

export default Header;
