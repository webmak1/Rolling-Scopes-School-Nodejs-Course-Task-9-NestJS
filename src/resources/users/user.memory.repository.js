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
  } else if (user.lenght > 1) {
    throw new Error('[App Error] DBUsers is corrupted!');
  }
  return user;
};

/**
 * ### Create User
 * @param {User} user - User body
 * @returns {Promise<User | {}>} - Promise with Created User or Empty object
 */
const create = (user) => DBUsers.createUser(user);

const update = (id, body) => DBUsers.updateUser(id, body);

const remove = (id) => DBUsers.removeUser(id);

module.exports = { getAll, get, create, update, remove };
