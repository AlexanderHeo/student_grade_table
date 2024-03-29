require('dotenv/config');

const express = require('express');
const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');

const app = express();

app.use(staticMiddleware);
app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then((result) => res.json(result.rows[0]))
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

app.get('/api/grades', (req, res, next) => {
  const sql = `
    select * from "grades"
    `;
  db.query(sql)
    .then((result) => res.status(200).json(result.rows))
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

app.post('/api/grades', (req, res, next) => {
  const newGrade = req.body;
  const name = newGrade.name;
  const course = newGrade.course;
  const grade = newGrade.grade;
  if (!name) {
    return res.status(400).json({
      error: 'You must enter a name',
    });
  } else if (!course) {
    return res.status(400).json({
      error: 'You must enter a course',
    });
  } else if (!grade) {
    return res.status(400).json({
      error: 'You must enter a grade',
    });
  } else if (!parseInt(grade)) {
    return res.status(400).json({
      error: 'Grade must be a positive integer',
    });
  } else if (parseInt(grade) > 100) {
    return res.status(400).json({
      error: 'Grade cannot be larger than 100',
    });
  }
  const sql = `
    insert into "grades" ("name", "course", "grade")
    values ($1, $2, $3)
    returning *;
  `;
  const params = [name, course, grade];
  db.query(sql, params)
    .then((result) => res.status(201).json(result.rows[0]))
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

app.delete('/api/grades/:gradeId', (req, res, next) => {
  const { gradeId } = req.params;
  if (!parseInt(gradeId)) {
    return res.status(400).json({
      error: 'The grade id must be a positive integer',
    });
  }
  const sql = `
    delete from "grades"
    where "gradeId" = $1
    returning *;
  `;
  const params = [gradeId];
  db.query(sql, params)
    .then((result) => {
      const deletedGrade = result.rows[0];
      if (!deletedGrade) {
        res.status(404).json({
          error: `Cannot find student at id ${gradeId}`,
        });
      } else {
        res.status(204).json(deletedGrade);
      }
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

app.patch('/api/grades/:gradeId', (req, res, next) => {
  const { gradeId } = req.params;
  const course = req.body.course;
  const grade = req.body.grade;
  if (!parseInt(gradeId)) {
    return res.status(400).json({
      error: 'The grade id must be a positive integer',
    });
  } else if (!grade || isNaN(grade)) {
    return res.status(400).json({
      error: 'Grade must be a positive integer',
    });
  }
  const sql = `
    update "grades"
    set "course" = $1, "grade" = $2
    where "gradeId" = $3
    returning *;
  `;
  const params = [course, grade, gradeId];
  db.query(sql, params)
    .then((result) => {
      const updatedGrade = result.rows[0];
      if (!updatedGrade) {
        res.status(400).json({
          error: `Cannot find student with id ${gradeId}`,
        });
      } else {
        res.status(200).json(updatedGrade);
      }
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occured',
    });
  }
});

app.listen(process.env.PORT, () => {
  /* eslint-disable no-console */
  console.log(`Listening on port ${process.env.PORT}, yo`);
});
