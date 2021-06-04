// @ts-check

import { Application, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { boardsService } from 'resources/boards/board.service';

import express = require('express');

const router: Application = express();

export interface IBoardReqBody {
  title: string;
  columns: string;
}

// GET ALL BOARDS
router.route('/').get((_req: Request, res: Response) => {
  try {
    return res.json(boardsService.getAll());
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send('Something bad happened!');
  }
});

// GET BOARD BY ID
router.route('/:id').get((req: Request, res: Response) => {
  try {
    const { id: boardId } = req.params;
    if (boardId) {
      return res.json(boardsService.get(boardId));
    }

    return res.status(StatusCodes.BAD_REQUEST).send('[App] Invalid req params');
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send('Something bad happened!');
  }
});

// CREATE BOARD
router.route('/').post((req: Request, res: Response) => {
  try {
    const { title, columns } = req.body as IBoardReqBody;
    if (title && columns) {
      return res
        .status(StatusCodes.CREATED)
        .json(boardsService.create(title, columns));
    }
    return res.status(StatusCodes.BAD_REQUEST).send('[App] Invalid req params');
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send('Something bad happened!');
  }
});

// UPDATE BOARD
router.route('/:id').put((req: Request, res: Response) => {
  try {
    const { id: boardId } = req.params;
    const { title, columns } = req.body as IBoardReqBody;

    if (boardId) {
      return res.json(boardsService.update(boardId, title, columns));
    }
    return res.status(StatusCodes.BAD_REQUEST).send('[App] invalid req params');
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send('Something bad happened!');
  }
});

// DELETE BOARD
router.route('/:id').delete((req: Request, res: Response) => {
  try {
    const { id: boardId } = req.params;
    if (boardId) {
      return res.json(boardsService.remove(boardId));
    }
    return res.status(StatusCodes.BAD_REQUEST).send('[App] invalid req params');
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send('Something bad happened!');
  }
});

export { router };
