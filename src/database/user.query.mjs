import db from "./connection.mjs";

const UserQuery = {
  activateUser: async function (email) {
    const [results] = await db.query(
      `UPDATE users SET is_active = 1 WHERE email = ?`,
      [email]
    );
    return results;
  },
  isUserActive: async function (email) {
    const [results] = await db.query(
      `SELECT is_active as isActive FROM users WHERE email = ?`,
      [email]
    );
    return results[0].isActive;
  },
  isEmailExist: async function (email) {
    const [results] = await db.query(
      `SELECT count(email) as isExist FROM users WHERE email = ?`,
      [email]
    );
    return results[0].isExist;
  },
  getCustomer: async function (email) {
    const [results] = await db.query(
      `SELECT id, email, created_at as createdAt, updated_at as updatedAt, is_active as isActive FROM users
       WHERE email = ?`,
      [email]
    );
    return results[0];
  },
  getCustomerForAuth: async function (email) {
    const [results] = await db.query(
      `SELECT id, email, password, is_active as isActive FROM users
       WHERE email = ?`,
      [email]
    );
    return results[0];
  },
  registerUser: async function (id, email, password) {
    const [results] = await db.query(
      `INSERT INTO users (id, email, password) VALUES (?, ?, ?)`,
      [id, email, password]
    );
    return results;
  },
};

export default UserQuery;
