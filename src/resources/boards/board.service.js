// @ts-check

const boardsRepo = require('./board.memory.repository');
const Board = require('./board.model');

const getAll = async () => {
  const boards = await boardsRepo.getAll();
  return boards.map(Board.toResponse);
};

const get = async (req) => {
  const { id: boardId } = req.params;
  const board = await boardsRepo.get(boardId);
  return Board.toResponse(board);
};

const create = async (req) => {
  const board = await boardsRepo.create(
    new Board({
      title: req.body.title,
      columns: req.body.columns,
    })
  );
  return Board.toResponse(board);
};

const update = async (req) => {
  const board = await boardsRepo.update(req.params.id, req.body);
  return Board.toResponse(board);
};

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
