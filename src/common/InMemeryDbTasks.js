const _ = require('lodash');

const DBTasks = [];

const getAllTasks = async () => DBTasks.slice(0);

const getTask = async (boardId, taskId) => {
  const allTasks = await getAllTasks();
  let result;

  if (!boardId) {
    result = await allTasks.filter((el) => el.id === taskId)[0];
  } else {
    result = await allTasks.filter(
      (el) => el.boardId === boardId && el.id === taskId
    )[0];
  }
  return result;
};

const createTask = async (task) => {
  DBTasks.push(task);
  return getTask(null, task.id);
};

const removeTask = async (id) => {
  const deletedTask = await getTask(null, id);
  await _.remove(DBTasks, (task) => task.id === id);
  return deletedTask;
};

const deleteUserFromTasks = async (userId) => {
  await _.map(DBTasks, async (task) => {
    if (task.userId === userId) {
      await removeTask(task.id);
      await createTask({ ...task, userId: null });
    }
  });
  return null;
};

const updateTask = async (_boardId, taskId, body) => {
  await removeTask(taskId);
  await createTask(body);
  return getTask(null, taskId);
};

const removeTaskByBoardId = async (boardId) => {
  await _.remove(DBTasks, (task) => task.boardId === boardId);
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  removeTask,
  deleteUserFromTasks,
  removeTaskByBoardId,
};
