// @ts-check

const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

/**
 * ### Get All Users in Service
// * @returns {Promise<{ id, name, login }[]>} - Promise with All Users in Service
 */
const getAll = async () => {
  const users = await usersRepo.getAll();
  return users.map(User.toResponse);
};

/**
 * ### Get User by ID in Service
// * @param {Request} req - Request
 * @returns {Promise<{ id, name, login }>} - Promise with User by ID in Service
 */
const get = async (req) => {
  const user = await usersRepo.get(req.params.id);
  return User.toResponse(user);
};

/**
 * ### Get User by ID in Service
// * @param {Request} req - Request
 * @returns {Promise<{ id, name, login } | {}>} - Promise with User by ID in Service
 */
const create = async (req) => {
  const { login, password, name } = req.body;
  const user = new User({
    login,
    password,
    name,
  });

  const createdUser = await usersRepo.create(user);

  return User.toResponse(createdUser);
};

/**
 * ### Update User
 * @param {string} id - User Id
 * @param {object} newUser - new User
 * @returns {Promise<{ id, name, login }>}  - Promise with Updated User
 */
const update = async (id, newUser) => {
  const user = await usersRepo.update(id, newUser);
  return User.toResponse(user);
};

/**
 * ### Remove User
 * @param {string} id - User Id
 * @returns {Promise<{ id, name, login }>} - Promise with Deleted User
 */
const remove = async (id) => {
  const user = await usersRepo.remove(id);
  return User.toResponse(user);
};

module.exports = { getAll, get, create, remove, update };
