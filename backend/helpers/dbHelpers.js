// It needs to be changed completely!

module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: 'SELECT * FROM users',
    };

    return db.query(query).then((result) => result.rows);
  };

  const getProjects = () => {
    const query = {
      text: 'SELECT * FROM projects',
    };

    return db.query(query).then((result) => result.rows);
  };

  const createProject = (name, description, expected_end_date) => {
    // We can build query string depending on the availability of start_date
    const query = {
      text: `INSERT INTO projects (name, description, expected_end_date)
    VALUES ($1, $2, $3) RETURNING *`,
      values: [name, description, expected_end_date],
    };

    return db.query(query).then((result) => result.rows[0]);
  };

  const editProject = (
    id,
    name,
    description,
    start_date,
    expected_end_date
  ) => {
    const query = {
      text: `
      UPDATE projects
      SET name = $2, description = $3, start_date = $4, expected_end_date = $5
      WHERE id = $1
      RETURNING *`,
      values: [id, name, description, start_date, expected_end_date],
    };
    return db.query(query);
  };

  const createTask = (name, description, status = 'TO-DO', deadline = '2025-11-08 05:00:00', assigned_user_id = 1, project_id = 1) => {
    // We can build query string depending on the availability of start_date
    const query = {
      text: `INSERT INTO projects (name, description, status, deadLine, assigned_user_id, project_id)
    VALUES ($1, $2, $3) RETURNING *`,
      values: [name, description, status, deadline, assigned_user_id, project_id],
    };

    return db.query(query).then((result) => result.rows[0]);
  };


  const deleteProject = (id) => {
    const query = {
      text: 'DELETE FROM projects WHERE id = $1',
      values: [id],
    };
    return db.query(query);
  };

  const deleteTask = (id) => {
    const query = {
      text: 'DELETE FROM tasks WHERE id = $1',
      values: [id],
    };
    return db.query(query);
  };

  const getTasksByProjectId = (id) => {
    const query = {
      text: `
      SELECT projects.name AS project_name, projects.id AS project_id, tasks.id, tasks.name, tasks.description, tasks.status, tasks.deadline, tasks.completion_time, tasks.assigned_user_id FROM projects JOIN tasks ON project_id=projects.id
      WHERE projects.id = $1
      `,
      values: [id],
    };
    return db.query(query);
  };

  const getUserByEmail = (email) => {
    const query = {
      text: `SELECT * FROM users WHERE email = $1`,
      values: [email],
    };

    return db.query(query).then((result) => result.rows[0]);
  };

  const addUser = (name, avatar, email, password) => {
    const query = {
      text: `INSERT INTO users (name, avatar, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
      values: [name, avatar, email, password],
    };

    return db.query(query);
  };

  return {
    getUsers,
    getProjects,
    createProject,
    editProject,
    deleteProject,
    getUserByEmail,
    addUser,
    createTask,
    getTasksByProjectId,
    deleteTask,
  };
};
