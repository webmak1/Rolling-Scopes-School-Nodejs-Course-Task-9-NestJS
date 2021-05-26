// @ts-check

const _ = require('lodash');
const DBTasks = require('./InMemoryDbTasks');

/**
 * A Board
 * @typedef {Object} Board - Board
 * @property {string} id - Id
 * @property {string} title - Title
 * @property {string} columns - Columns
 */

/**
 * @type{Board[]}
 */
const DBBoards = [];

/**
 * ### Get All Boards
 * @returns {Promise<Board[]>} - Promise with All Boards
 */
const getAllBoards = async () => DBBoards.slice(0);

/**
 * ### Get Board
 * @param {string} id - board id
 * @returns {Promise<Board>} - Promise with a Single Board
 */
const getBoard = async (id) => {
  const allBoards = await getAllBoards();
  return allBoards.filter((el) => el.id === id)[0];
};

/**
 * ### Create Board
 * @param {object} board - Board body
 * @returns {Promise<Board>} - Promise with Created Board or Empty object
 */
const createBoard = async (board) => {
  DBBoards.push(board);
  return getBoard(board.id);
};

/**
 * ### Remove Board
 * @param {string} boardId - Board Id
 * @returns {Promise<Board>} - Promise with Deleted Board
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
 * @param {Board} newBoard - New Board
 * @returns {Promise<Board>} - Promise with Updated Board
 */
const updateBoard = async (id, newBoard) => {
  await removeBoard(id);
  await createBoard(newBoard);
  return getBoard(id);
};

module.exports = {
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  removeBoard,
};
