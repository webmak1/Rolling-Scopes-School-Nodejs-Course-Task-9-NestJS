// @ts-check

const _ = require('lodash');
const DBTasks = require('./InMemoryDbTasks');

/**
 * A User
 * @typedef {Object} - User
 * @property {string} id - Id
 * @property {string} name - Name
 * @property {string} login - Login
 * @property {string} password - Password
 */

const DBUsers = [{}];

/**
 * ### Get All Users
 * @returns {Promise<{User} | {}>} - Promise with All Users or Promise with {}
 */
const getAllUsers = async () => {
  if (DBUsers.length > 0 && DBUsers[0] !== {}) {
    return DBUsers.slice(0);
  }
  return DBUsers;
};

/**
 * ### Get User
 * @param {string} id - user id
 * @returns {Promise<{User} | {}>} - One User by Id
 */
const getUser = async (id) => {
  const allUsers = await getAllUsers();
  return allUsers.filter((el) => el.id === id)[0];
};

/**
 * ### Create User
 * @param {object} user - User body
 * @returns {Promise<{User} | {}>} - Created User
 */
const createUser = async (user) => {
  DBUsers.push(user);
  return getUser(user.id);
};

/**
 * ### Remove User
 * @param {string} userId - User Id
 * @returns {Promise<User | {}>} - Deleted User
 */
const removeUser = async (userId) => {
  const deletedUser = await getUser(userId);
  await _.remove(DBUsers, (user) => user.id === userId);
  await DBTasks.deleteUserFromTasks(userId);
  return deletedUser;
};

/**
 * ### Update User
 * @param {string} id - User Id
 * @param {object} body - User Body
 * @returns {Promise<object>} - Updated User
 */
const updateUser = async (id, body) => {
  await removeUser(id);
  await createUser(body);
  return getUser(id);
};

module.exports = { getAllUsers, getUser, createUser, updateUser, removeUser };
