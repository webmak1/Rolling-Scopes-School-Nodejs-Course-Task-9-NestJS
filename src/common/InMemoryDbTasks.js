// @ts-check

const _ = require('lodash');

/**
 * A Tasks
 * @typedef {Object} Task
 * @property {string} id - Id
 * @property {string} title - Title
 * @property {string} order - Order
 * @property {string} description - Description
 * @property {string} userId - User Id
 * @property {string} boardId - Board Id
 * @property {string} columnId - Column Id
 */

const DBTasks = [];

/**
 * ### Get All Tasks
 * @returns {Promise<object>} - All Tasks
 */
const getAllTasks = async () => DBTasks.slice(0);

/**
 * ### Get Task
 * @param {string} boardId - board id
 * @param {string} taskId - task id
 * @returns {Promise<object>} - One Board by Id
 */
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

/**
 * ### Create Task
 * @param {object} task - Task body
 * @returns {Promise<object>} - Created Task
 */
const createTask = async (task) => {
  DBTasks.push(task);
  return getTask(null, task.id);
};

/**
 * ### Remove Task
 * @param {string} id - Task Id
 * @returns {Promise<object>} - Deleted Task
 */
const removeTask = async (id) => {
  const deletedTask = await getTask(null, id);
  await _.remove(DBTasks, (task) => task.id === id);
  return deletedTask;
};

/**
 * ### Delete User From Tasks
 * @param {string} userId
 * @returns {Promise<null>} - Promise with Nothing
 */
const deleteUserFromTasks = async (userId) => {
  await _.map(DBTasks, async (task) => {
    if (task.userId === userId) {
      await removeTask(task.id);
      await createTask({ ...task, userId: null });
    }
  });
  return null;
};

/**
 * ### Update Task
 * @param {string} boardId - Board Id
 * @param {string} taskId - Task Id
 * @param {object} body - Task Body
 * @returns {Promise<object>} - Updated Board
 */
const updateTask = async (boardId, taskId, body) => {
  await removeTask(taskId);
  await createTask(body);
  return getTask(null, taskId);
};

/**
 * ### Remove Task by Board Id
 * @param {string} boardId
 * @returns {Promise<void>} - Promise of Nothing
 */
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
