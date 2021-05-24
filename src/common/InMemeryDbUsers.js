const _ = require('lodash');
const DBTasks = require('./InMemeryDbTasks');

const DBUsers = [];

const getAllUsers = async () => DBUsers.slice(0);

const getUser = async (id) => {
  const allUsers = await getAllUsers();
  return allUsers.filter((el) => el.id === id)[0];
};

const createUser = async (user) => {
  DBUsers.push(user);
  return getUser(user.id);
};

const removeUser = async (userId) => {
  const deletedUser = await getUser(userId);
  await _.remove(DBUsers, (user) => user.id === userId);
  await DBTasks.deleteUserFromTasks(userId);
  return deletedUser;
};

const updateUser = async (id, body) => {
  await removeUser(id);
  await createUser(body);
  return getUser(id);
};

module.exports = { getAllUsers, getUser, createUser, updateUser, removeUser };
