const { StatusCodes } = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');

// GET ALL
router.route('/').get(async (_req, res) => {
  try {
    return res.json(await tasksService.getAll());
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
});

// GET BY ID
router.route('/:id').get(async (req, res) => {
  try {
    return res.json(await tasksService.get(req));
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
});

// CREATE
router.route('/').post(async (req, res) => {
  try {
    return res.status(StatusCodes.CREATED).json(await tasksService.create(req));
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
});

// UPDATE
router.route('/:id').put(async (req, res) => {
  try {
    return res.json(await tasksService.update(req));
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
});

// DELETE
router.route('/:id').delete(async (req, res) => {
  try {
    return res.json(await tasksService.remove(req));
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
});

module.exports = router;
