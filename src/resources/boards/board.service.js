// @ts-check

const boardsRepo = require('./board.memory.repository');
const Board = require('./board.model');

/**
 * ### Get All Boards
 * @returns {Promise<Board[]>} - Promise with All Boards
 */
const getAll = async () => {
  const boards = await boardsRepo.getAll();
  return boards.map(Board.toResponse);
};

/**
 * ### Get Board
 * @param {Request} req - request
 * @returns {Promise<Board>} - Promise with a Single Board
 */
const get = async (req) => {
  const { id: boardId } = req.params;
  const board = await boardsRepo.get(boardId);
  return Board.toResponse(board);
};

/**
 * ### Create Board
 * @param {Request} req - request
 * @returns {Promise<Board | {}>} - Promise with Created Board or Empty object
 */
const create = async (req) => {
  const board = await boardsRepo.create(
    new Board({
      title: req.body.title,
      columns: req.body.columns,
    })
  );
  return Board.toResponse(board);
};

/**
 * ### Update Board
 * @param {Request} req - request
 * @returns {Promise<Board>} - Promise with Updated Board
 */
const update = async (req) => {
  const board = await boardsRepo.update(req.params.id, req.body);
  return Board.toResponse(board);
};

/**
 * ### Remove Board
 * @param {Request} req - request
 * @returns {Promise<Board>} - Promise with Deleted Board
 */
const remove = async (req) => {
  const { id: boardId } = req.params;
  const board = await boardsRepo.remove(boardId);
  return Board.toResponse(board);
};

module.exports = {
  getAll,
  get,
  create,
  remove,
  update,
};
