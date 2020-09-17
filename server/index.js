/* eslint-disable no-console */
const express = require('express');
const app = express();

const pg = require('pg');
const db = new pg.Pool({
  connectionString: 'postgres://dev:lfz@localhost/sgt'
});
const staticMiddleware = require('./static-middleware');

app.use(staticMiddleware);
app.use(express.json());

app.get('/api/grades', (req, res) => {
  const sql = `
    select *
      from "grades"
    `;
  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({
        error: 'An unexpected error occured.'
      });
    });
});

app.get('/api/grades/:gradeId', (req, res, next) => {
  const { gradeId } = req.params;
  if (!parseInt(gradeId, 10)) {
    return res.status(400).json({
      error: '"gradeId" must be a positive integer'
    });
  }
  const sql = `
    select *
      from "grades"
     where "gradeId" = $1
  `;
  const params = [gradeId];
  db.query(sql, params)
    .then(result => {
      const grade = result.rows[0];
      if (!grade) {
        res.status(404).json({
          error: `Cannot find grade with "gradeId" ${gradeId}`
        });
      } else {
        res.json(grade);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.post('/api/grades', (req, res) => {
  const newGrade = req.body;
  const name = newGrade.name;
  const course = newGrade.course;
  const grade = newGrade.grade;
  if (!name) {
    return res.status(400).json({
      error: 'You must enter a name for the student.'
    });
  } else if (!course) {
    return res.status(400).json({
      error: 'You must enter a course for the student.'
    });
  } else if (!parseInt(grade)) {
    return res.status(400).json({
      error: 'Grade must be a positive integer.'
    });
  } else if (parseInt(grade) > 100) {
    return res.status(400).json({
      error: 'Grade cannot be larger than 100.'
    });
  }
  const sql = `
    insert into "grades" ("name", "course", "grade")
    values ($1, $2, $3)
    returning *;
  `;
  const params = ([name, course, grade]);
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.patch('/api/grades/:gradeId', (req, res) => {
  const { gradeId } = req.params;
  const course = req.body.course;
  const grade = req.body.grade;
  if (!parseInt(gradeId)) {
    return res.status(400).json({
      error: 'The grade id must be a positive integer.'
    });
  } else if (!grade || isNaN(grade)) {
    return res.status(400).json({
      error: 'You must enter a number grade for the student.'
    });
  }
  const sql = `
    update "grades"
      set "course" = $1, "grade" = $2
      where "gradeId" = $3
      returning *;
  `;
  const params = ([
    course, grade, gradeId
  ]);
  db.query(sql, params)
    .then(result => {
      const updatedGrade = result.rows[0];
      if (!updatedGrade) {
        res.status(404).json({
          error: `Cannot find student with id ${gradeId}.`
        });
      } else {
        res.status(200).json(updatedGrade);
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({
        error: 'An unexpected error occured.'
      });
    });
});

app.delete('/api/grades/:gradeId', (req, res) => {
  const { gradeId } = req.params;
  if (!parseInt(gradeId)) {
    return res.status(400).json({
      error: 'The grade id must be a positive integer.'
    });
  }
  const sql = `
    delete from "grades"
      where "gradeId" = $1
      returning *;
  `;
  const params = [gradeId];
  db.query(sql, params)
    .then(result => {
      const deletedGrade = result.rows[0];
      if (!deletedGrade) {
        res.status(404).json({
          error: `Cannot find student at id ${gradeId}.`
        });
      } else {
        res.status(204).json(deletedGrade);
      }
    });
});

app.listen(3005, () => {
  console.log('Listening on port 3005 yo');
});
