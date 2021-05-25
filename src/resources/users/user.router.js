// @ts-check

const { StatusCodes } = require('http-status-codes');
const router = require('express').Router();
const usersService = require('./user.service');

// GET ALL
router.route('/').get(async (_req, res) => {
  try {
    return res.json(await usersService.getAll());
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
});

// GET BY ID
router.route('/:id').get(async (req, res) => {
  try {
    return res.json(await usersService.get(req));
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
});

// CREATE
router.route('/').post(async (req, res) => {
  try {
    return res.status(StatusCodes.CREATED).json(await usersService.create(req));
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
});

// UPDATE
router.route('/:id').put(async (req, res) => {
  try {
    return res.json(await usersService.update(req.params.id, req.body));
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
});

// DELETE
router.route('/:id').delete(async (req, res) => {
  try {
    return res.json(await usersService.remove(req.params.id));
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
});

module.exports = router;
