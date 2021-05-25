// @ts-check

const _ = require('lodash');
const DBTasks = require('./InMemoryDbTasks');

/**
 * A Board
 * @typedef {Object} Board
 * @property {string} id - Id
 * @property {string} title - Title
 * @property {string} columns - Columns
 */

/**
 * ### Boards DB
 * @type [{Board}] | [{}]
 */
const DBBoards = [{}];

/**
 * ### Get All Boards
 * @returns [{Board}] | [{}] - All Boards
 */
const getAllBoards = async () => DBBoards.slice(0);

/**
 * ### Get Board
 * @param {string} id - board id
 * @returns [{Board}] | [{}] - One Board by Id
 */
const getBoard = async (id) => {
  const allBoards = await getAllBoards();
  return allBoards.filter((el) => el.id === id)[0];
};

/**
 * ### Create Board
 * @param {object} board - Board body
 * @returns [{Board}] | [{}] - Created Board
 */
const createBoard = async (board) => {
  DBBoards.push(board);
  return getBoard(board.id);
};

/**
 * ### Remove Board
 * @param {string} boardId - Board Id
 * @returns [{Board}] | [{}] - Deleted Board
 */
const removeBoard = async (boardId) => {
  const deletedBoard = await getBoard(boardId);
  await _.remove(DBBoards, (board) => board.id === boardId);
  await DBTasks.removeTaskByBoardId(boardId);
  return deletedBoard;
};

/**
 * ### Update Board
 * @param {string} id - Board Id
 * @param {object} body - Board body
 * @returns [{Board}] | [{}] - Updated Board
 */
const updateBoard = async (id, body) => {
  await removeBoard(id);
  await createBoard(body);
  return getBoard(id);
};

module.exports = {
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  removeBoard,
};
