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

/**
 * @type{Task[]}
 */
const DBTasks = [];

/**
 * ### Get All Tasks
 * @returns {Promise<Task[]>} - Promise with All Tasks
 */
const getAllTasks = async () => DBTasks.slice(0);

/**
 * ### Get Task
 * @param {string} boardId - board id
 * @param {string} taskId - task id
 * @returns {Promise<Task>} - Promise with a Single Task
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
 * @param {Task} task - Task body
 * @returns {Promise<Task | {}>} - Promise with Created Task or Empty object
 */
const createTask = async (task) => {
  DBTasks.push(task);
  return getTask(null, task.id);
};

/**
 * ### Remove Task
 * @param {string} id - Task Id
 * @returns {Promise<Task>} - Promise with Deleted Task
 */
const removeTask = async (id) => {
  const deletedTask = await getTask(null, id);
  await _.remove(DBTasks, (task) => task.id === id);
  return deletedTask;
};

/**
 * ### Delete User From Tasks
 * @param {string} userId
 * @returns {Promise<void>} - Promise with Nothing
 */
const deleteUserFromTasks = async (userId) => {
  await _.map(DBTasks, async (task) => {
    if (task.userId === userId) {
      await removeTask(task.id);
      await createTask({ ...task, userId: null });
    }
  });
};

/**
 * ### Update Task
 * @param {string} boardId - Board Id
 * @param {string} taskId - Task Id
 * @param {Task} newTask - new Task
 * @returns {Promise<Task>} - Promise with Updated Task
 */
const updateTask = async (boardId, taskId, newTask) => {
  await removeTask(taskId);
  await createTask(newTask);
  return getTask(null, taskId);
};

/**
 * ### Remove Task by Board Id
 * @param {string} boardId
 * @returns {Promise<void>} - Promise with Nothing
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
