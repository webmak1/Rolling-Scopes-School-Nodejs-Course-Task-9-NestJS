const _ = require('lodash');
const DBTasks = require('./InMemeryDbTasks');

const DBBoards = [];

const getAllBoards = async () => DBBoards.slice(0);

const getBoard = async (id) => {
  const allBoards = await getAllBoards();
  return allBoards.filter((el) => el.id === id)[0];
};

const createBoard = async (board) => {
  DBBoards.push(board);
  return getBoard(board.id);
};

const removeBoard = async (boardId) => {
  const deletedBoard = await getBoard(boardId);
  await _.remove(DBBoards, (board) => board.id === boardId);
  await DBTasks.removeTaskByBoardId(boardId);
  return deletedBoard;
};

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
