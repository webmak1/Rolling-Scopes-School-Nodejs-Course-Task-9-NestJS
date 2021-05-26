// @ts-check

const DBUsers = require('../../common/InMemoryDbUsers');

/**
 * A User
 * @typedef {Object} User - User
 * @property {string} id - Id
 * @property {string} name - Name
 * @property {string} login - Login
 * @property {string} password - Password
 */

/**
 * ### Get All Users in Repository
 * @returns {Promise<User[]>} - Promise with All Users in Repository
 */
const getAll = async () => DBUsers.getAllUsers();

/**
 * ### Get User
 * @param {string} id - user id
 * @returns {Promise<User>} - Promise with a Single User
 */
const get = async (id) => {
  const user = await DBUsers.getUser(id);
  if (!user) {
    throw new Error(`[App Error] The user with id: ${id} was not found!`);
  }
  return user;
};

/**
 * ### Create User
 * @param {User} user - User
 * @returns {Promise<User | {}>} - Promise with Created User or Empty object
 */
const create = (user) => DBUsers.createUser(user);

/**
 * ### Update User
 * @param {string} id - User Id
 * @param {object} newUser - new User
 * @returns {Promise<User>} - Promise with Updated User
 */
const update = (id, newUser) => DBUsers.updateUser(id, newUser);

/**
 * ### Remove User
 * @param {string} id - User Id
 * @returns {Promise<User>} - Promise with Deleted User
 */
const remove = (id) => DBUsers.removeUser(id);

module.exports = { getAll, get, create, update, remove };
