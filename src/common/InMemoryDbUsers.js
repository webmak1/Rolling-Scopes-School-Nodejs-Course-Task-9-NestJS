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
 * ### Get All Users in DataBase file
 * @returns {Promise<User[]>} - Promise with All Users in DataBase file
 */
const getAllUsers = async () => DBUsers.slice(0);

/**
 * ### Get User by Id in DataBase file
 * @param {string} id - user id
 * @returns {Promise<User>} - Promise with a Single User in DataBase file
 */
const getUser = async (id) => {
  const allUsers = await getAllUsers();
  return allUsers.filter((el) => el.id === id)[0];
};

/**
 * ### Create User in DataBase file
 * @param {User} user - User body
 * @returns {Promise<User>} - Promise with Created User in DataBase file
 */
const createUser = async (user) => {
  DBUsers.push(user);
  return getUser(user.id);
};

/**
 * ### Remove User in DataBase file
 * @param {string} userId - User Id
 * @returns {Promise<User>} - Promise with Deleted User in DataBase file
 */
const removeUser = async (userId) => {
  const deletedUser = await getUser(userId);
  await _.remove(DBUsers, (user) => user.id === userId);
  await DBTasks.deleteUserFromTasks(userId);
  return deletedUser;
};

/**
 * ### Update User in DataBase file
 * @param {string} id - User Id
 * @param {object} newUser - new User
 * @returns {Promise<User>} - Promise with Updated User in DataBase file
 */
const updateUser = async (id, newUser) => {
  await removeUser(id);
  await createUser(newUser);
  return getUser(id);
};

module.exports = { getAllUsers, getUser, createUser, updateUser, removeUser };
