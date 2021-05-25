// @ts-check

const { StatusCodes } = require('http-status-codes');
const router = require('express').Router();
const boardsService = require('./board.service');

// GET ALL
router.route('/').get(async (_req, res) => {
  try {
    return res.json(await boardsService.getAll());
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
});

// GET BY ID
router.route('/:id').get(async (req, res) => {
  try {
    return res.json(await boardsService.get(req));
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
});

// CREATE
router.route('/').post(async (req, res) => {
  try {
    return res
      .status(StatusCodes.CREATED)
      .json(await boardsService.create(req));
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
});

// UPDATE
router.route('/:id').put(async (req, res) => {
  try {
    return res.json(await boardsService.update(req));
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
});

// DELETE
router.route('/:id').delete(async (req, res) => {
  try {
    return res.json(await boardsService.remove(req));
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
});

module.exports = router;
