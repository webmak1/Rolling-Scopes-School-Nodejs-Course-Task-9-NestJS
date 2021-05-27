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
 * ### Get User by Id in Repository
 * @param {string} id - user id
 * @returns {Promise<User>} - Promise with User by Id in Repository
 */
const get = async (id) => {
  const user = await DBUsers.getUser(id);
  if (!user) {
    throw new Error(`[App Error] The user with id: ${id} was not found!`);
  }
  return user;
};

/**
 * ### Create User in Repository
 * @param {User} user - User
 * @returns {Promise<User>} - Promise with Created User in Repository
 */
const create = (user) => DBUsers.createUser(user);

/**
 * ### Update User in Repository
 * @param {string} id - User Id
 * @param {object} newUser - new User
 * @returns {Promise<User>} - Promise with Updated User in Repository
 */
const update = (id, newUser) => DBUsers.updateUser(id, newUser);

/**
 * ### Remove User in Repository
 * @param {string} id - User Id
 * @returns {Promise<User>} - Promise with Deleted User in Repository
 */
const remove = (id) => DBUsers.removeUser(id);

module.exports = { getAll, get, create, update, remove };
