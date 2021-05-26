// @ts-check

const _ = require('lodash');
const DBTasks = require('./InMemoryDbTasks');

/**
 * A User
 * @typedef {Object} User - User
 * @property {string} id - Id
 * @property {string} name - Name
 * @property {string} login - Login
 * @property {string} password - Password
 */

/**
 * @type{User[]}
 */
const DBUsers = [];

/**
 * ### Get All Users
 * @returns {Promise<User[]>} - Promise with All Users
 */
const getAllUsers = async () => DBUsers.slice(0);

/**
 * ### Get User
 * @param {string} id - user id
 * @returns {Promise<User>} - Promise with a Single User
 */
const getUser = async (id) => {
  const allUsers = await getAllUsers();
  return allUsers.filter((el) => el.id === id)[0];
};

/**
 * ### Create User
 * @param {User} user - User body
 * @returns {Promise<User | {}>} - Promise with Created User or Empty object
 */
const createUser = async (user) => {
  DBUsers.push(user);
  return getUser(user.id);
};

/**
 * ### Remove User
 * @param {string} userId - User Id
 * @returns {Promise<User>} - Promise with Deleted User
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
 * @param {object} newUser - new User
 * @returns {Promise<User>} - Promise with Updated User
 */
const updateUser = async (id, newUser) => {
  await removeUser(id);
  await createUser(newUser);
  return getUser(id);
};

module.exports = { getAllUsers, getUser, createUser, updateUser, removeUser };
