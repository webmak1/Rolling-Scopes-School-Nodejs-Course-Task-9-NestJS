// @ts-check

const DBBoards = require('../../common/InMemoryDbBoards');

/**
 * A Board
 * @typedef {Object} Board - Board
 * @property {string} id - Id
 * @property {string} title - Title
 * @property {string} columns - Columns
 */

/**
 * ### Get All Boards in Repository
 * @returns {Promise<Board[]>} - Promise with All Boards in Repository
 */
const getAll = async () => DBBoards.getAllBoards();

/**
 * ### Get Board By Id in Repository
 * @param {string} id - board id
 * @returns {Promise<Board>} - Promise with a Single Board in Repository
 */
const get = async (id) => {
  const board = await DBBoards.getBoard(id);
  if (!board) {
    throw new Error(`[App Error] The board with id: ${id} was not found!`);
  }
  return board;
};

/**
 * ### Create Board in Repository
 * @param {object} board - Board body
 * @returns {Promise<Board>} - Promise with Created Board in Repository
 */
const create = (board) => DBBoards.createBoard(board);

/**
 * ### Update Board in Repository
 * @param {string} id - Board Id
 * @param {Board} newBoard - New Board
 * @returns {Promise<Board>} - Promise with Updated Board in Repository
 */
const update = (id, newBoard) => DBBoards.updateBoard(id, newBoard);

/**
 * ### Remove Board in Repository
 * @param {string} boardId - Board Id
 * @returns {Promise<Board>} - Promise with Deleted Board in Repository
 */
const remove = (boardId) => DBBoards.removeBoard(boardId);

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
};
