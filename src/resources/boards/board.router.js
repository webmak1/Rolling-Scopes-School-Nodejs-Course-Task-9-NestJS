// @ts-check

const express = require('express');
const { StatusCodes } = require('http-status-codes');
const router = require('express').Router();
const boardsService = require('./board.service');
const Board = require('./board.model');

/**
 * ### Get All Boards
 * @param {string} path - Express path
 * @route {GET} /
 * @param {express.Request} req  - Express request object
 * @param {express.Response} res  - Express response object
 * @returns {JSON(Board[])} - All Boards in JSON format
 */
router.route('/').get(async (_req, res) => {
  try {
    return res.json(await boardsService.getAll());
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
});

/**
 * ### Get Single Board
 * @param {string} path - Express path
 * @route {GET} /:id
 * @param {express.Request} req  - Express request object
 * @param {express.Response} res  - Express response object
 * @returns {JSON(Board)} - Single Board in JSON format
 */
router.route('/:id').get(async (req, res) => {
  try {
    return res.json(await boardsService.get(req));
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
});

/**
 * ### Create Board
 * @param {string} path - Express path
 * @route {POST} /
 * @param {express.Request} req  - Express request object
 * @param {express.Response} res  - Express response object
 * @returns {JSON(Board)} - Created Board in JSON format
 */
router.route('/').post(async (req, res) => {
  try {
    return res
      .status(StatusCodes.CREATED)
      .json(await boardsService.create(req));
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
});

/**
 * ### Update Board
 * @param {string} path - Express path
 * @route {PUT} /:id
 * @param {express.Request} req  - Express request object
 * @param {express.Response} res  - Express response object
 * @returns {JSON(Board)} - Updated Board in JSON format
 */
router.route('/:id').put(async (req, res) => {
  try {
    return res.json(await boardsService.update(req));
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
});

/**
 * ### Delete Board
 * @param {string} path - Express path
 * @route {DELETE} /:id
 * @param {express.Request} req  - Express request object
 * @param {express.Response} res  - Express response object
 * @returns {JSON(Board)} - Deleted Board in JSON format
 */
router.route('/:id').delete(async (req, res) => {
  try {
    return res.json(await boardsService.remove(req));
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
});

// Dummy for linter
if (process.env.level) {
  console.log('**Express Version: ', express.version);
  console.log(Board);
}

module.exports = router;
