// @ts-check

const DBTasks = require('../../common/InMemoryDbTasks');

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
 * ### Get All Tasks
 * @returns {Promise<Task[]>} - Promise with All Tasks
 */
const getAll = async () => DBTasks.getAllTasks();

/**
 * ### Get Task
 * @param {string} boardId - board id
 * @param {string} taskId - task id
 * @returns {Promise<Task>} - Promise with a Single Task
 */
const get = async (boardId, taskId) => {
  const task = await DBTasks.getTask(boardId, taskId);
  if (!task) {
    throw new Error(`[App Error] The task with id: ${taskId} was not found!`);
  }
  return task;
};

/**
 * ### Create Task
 * @param {Task} task - Task body
 * @returns {Promise<Task>} - Promise with Created Task or Empty object
 */
const create = (task) => DBTasks.createTask(task);

/**
 * ### Update Task
 * @param {string} boardId - Board Id
 * @param {string} taskId - Task Id
 * @param {Task} newTask - new Task
 * @returns {Promise<Task>} - Promise with Updated Task
 */
const update = (boardId, taskId, newTask) =>
  DBTasks.updateTask(boardId, taskId, newTask);

/**
 * ### Remove Task
 * @param {string} id - Task Id
 * @returns {Promise<Task>} - Promise with Deleted Task
 */
const remove = (id) => DBTasks.removeTask(id);

module.exports = { getAll, get, create, update, remove };
