// @ts-check

const boardsRepo = require('./board.memory.repository');
const Board = require('./board.model');

// GET ALL BOARDS
const getAll = async () => {
  const boards = await boardsRepo.getAll();
  return boards.map(Board.toResponse);
};

// GET BOARD BY ID
const get = async (req) => {
  const { id: boardId } = req.params;
  const board = await boardsRepo.get(boardId);
  return Board.toResponse(board);
};

// CREATE BOARD
const create = async (req) => {
  const board = await boardsRepo.create(
    new Board({
      title: req.body.title,
      columns: req.body.columns,
    })
  );
  return Board.toResponse(board);
};

// UPDATE BOARD
const update = async (req) => {
  const board = await boardsRepo.update(req.params.id, req.body);
  return Board.toResponse(board);
};

// REMOVE BOARD
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
