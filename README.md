# sgt-react

The Student Grade Table: Written in React

## Introduction

The Student Grade Table is a dynamic web application for teachers who want to record the grades of their students.

## Getting Started

1. Create a new repository on your GitHub Account, initialized with a `README.md`.
1. Clone the repository into your `lfz/` directory.
1. Copy the starter files from this repository (except `features/` and the GIF) so your directory structure looks like this: **EVERY FILE COUNTS**.
    ```
    sgt-react/
    ├── .gitignore
    ├── .npmrc
    ├── README.md
    ├── client/
    │   ├── components/
    │   │   └── app.jsx
    │   └── index.jsx
    ├── database/
    │   └── db.json
    ├── package.json
    ├── server/
    │   ├── index.js
    │   └── public/
    │       ├── images/
    │       │   └── favicon.png
    │       ├── index.html
    │       └── styles.css
    └── webpack.config.js
    ```
1. Install all dependencies in `package.json` with NPM.
    ```bash
    npm install
    ```
1. Commit the starter files to `master` and `git push origin master` before working on the first feature.

## Workflow

Each feature should be implemented on its own branch. Commit at each step of each feature. **DO NOT WAIT TO COMMIT AT THE END**. Make a small amount of progress, and then commit. You will probably have anywhere from 5-10 commits per feature.

Open a Pull Request from your feature branch to your master branch and submit it for approval before moving on.

Your feature to look and function like the example GIF with no errors in the browser console.

## NPM Scripts

- `dev` - Start Webpack Dev Server on port `3000` and JSON Server on port `3001`. (Go to `http://localhost:3000`)
- `build` - Run Webpack to build the React client into `server/public`. (Usually only run during deployment)

## Features

- [User can view all grades.](features/user-can-view-all-grades.md)
- [User can view the average grade.](features/user-can-view-the-average-grade.md)
- [User can add a grade.](features/user-can-add-a-grade.md)
- [User can delete a grade.](features/user-can-delete-a-grade.md)

## Preview

![SGT React](sgt-react.gif)

## Server API

#### `GET /api/grades`

Responds with all recorded `grades`.

##### Example Response Body

```json
[
  {
    "id": 1,
    "name": "Scott Tolinski",
    "grade": 100,
    "course": "Web Development"
  },
  {
    "id": 2,
    "name": "Scott Bowler",
    "grade": 100,
    "course": "Web Development"
  }
]
```

#### `POST /api/grades`

Accepts a single `grade` object in the request body and inserts it into all `grades`. Responds with the inserted `grade`, including an auto-generated `id`.

##### Example Request Body

```json
{
  "name": "Tim Davis",
  "grade": 40,
  "course": "Web Development"
}
```

##### Example Response Body

```json
{
  "id": 3,
  "name": "Tim Davis",
  "grade": 40,
  "course": "Web Development"
}
```

#### `DELETE /api/grades/:id`

Removes a `grade` from all recorded `grades`, given an `id` in the request URL. _e.g._ `/api/grades/3`

##### Example Response Body

```json
{}
```
