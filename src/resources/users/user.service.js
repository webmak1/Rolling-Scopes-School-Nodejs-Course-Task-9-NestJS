// @ts-check

const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

const getAll = async () => {
  const users = await usersRepo.getAll();
  return users.map(User.toResponse);
};

const get = async (req) => {
  const user = await usersRepo.get(req.params.id);
  return User.toResponse(user);
};

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

const update = async (id, body) => {
  const user = await usersRepo.update(id, body);
  return User.toResponse(user);
};

const remove = async (id) => {
  const user = await usersRepo.remove(id);
  return User.toResponse(user);
};

module.exports = { getAll, get, create, remove, update };
