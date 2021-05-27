// @ts-check

const express = require('express');
const boardsRepo = require('./board.memory.repository');
const Board = require('./board.model');

/**
 * ### Get All Boards in Service
 * @returns {Promise<Board[]>} - Promise with All Boards in Service
 */
const getAll = async () => {
  const boards = await boardsRepo.getAll();
  return boards.map(Board.toResponse);
};

/**
 * ### Get Board By Id in Service
 * @param {express.Request} req
 * @returns {Promise<Board>} - Promise with a Single Board in Service
 */
const get = async (req) => {
  const { id: boardId } = req.params;
  const board = await boardsRepo.get(boardId);
  return Board.toResponse(board);
};

/**
 * ### Create Board in Service
 * @param {express.Request} req
 * @returns {Promise<Board>} - Promise with Created Board in Service
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
 * ### Update Board in Service
 * @param {express.Request} req
 * @returns {Promise<Board>} - Promise with Updated Board in Service
 */
const update = async (req) => {
  const board = await boardsRepo.update(req.params.id, req.body);
  return Board.toResponse(board);
};

/**
 * ### Remove Board in Service
 * @param {express.Request} req
 * @returns {Promise<Board>} - Promise with Deleted Board in Service
 */
const remove = async (req) => {
  const { id: boardId } = req.params;
  const board = await boardsRepo.remove(boardId);
  return Board.toResponse(board);
};

// Dummy for linter
if (process.env.level) {
  console.log('**Express Version: ', express.version);
}

module.exports = {
  getAll,
  get,
  create,
  remove,
  update,
};
