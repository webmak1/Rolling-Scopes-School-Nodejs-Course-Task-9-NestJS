const DBUsers = require('../../common/InMemeryDbUsers');

const getAll = async () => DBUsers.getAllUsers();

const get = async (id) => {
  const user = await DBUsers.getUser(id);
  if (!user) {
    throw new Error(`[App Error] The user with id: ${id} was not found!`);
  } else if (user.lenght > 1) {
    throw new Error('[App Error] DBUsers is corrupted!');
  }
  return user;
};

const create = (user) => DBUsers.createUser(user);

const update = (id, body) => DBUsers.updateUser(id, body);

const remove = (id) => DBUsers.removeUser(id);

module.exports = { getAll, get, create, update, remove };
