// @ts-check

import { IBoard, IColumn } from 'resources/boards/board.model';
import { tasksService } from 'resources/tasks/task.service';
import { getRepository } from 'typeorm';
import { BoardEntity } from './board.entity';

// GET ALL BOARDS
const getAll = async (): Promise<IBoard[]> => {
  const boardRepository = getRepository(BoardEntity);
  const boards = await boardRepository.find({});

  return boards;
};

// GET BOARD
const get = async (boardId: string): Promise<IBoard> => {
  const boardRepository = getRepository(BoardEntity);
  const board = await boardRepository.findOne(boardId);
  if (!board) {
    throw new Error('[App] Board not found!');
  }
  return board;
};

// CREATE BOARD
const create = async (title: string, columns: IColumn[]): Promise<IBoard> => {
  const boardRepository = getRepository(BoardEntity);

  const board = new BoardEntity();
  board.title = title;
  board.columns = columns;

  const createdBoard = await boardRepository.save(board);
  if (!createdBoard) {
    throw new Error('[App] Cant create Board!');
  }
  return createdBoard;
};

// UPDATE BOARD
const update = async (
  boardId: string,
  title: string,
  columns: IColumn[]
): Promise<IBoard> => {
  const boardRepository = getRepository(BoardEntity);

  const updatedBoard = await boardRepository.update(boardId, {
    title,
    columns,
  });

  if (!updatedBoard.affected) {
    throw new Error("[App] Can't Update Board!");
  }

  const updatedBoardResult = await get(boardId);
  return updatedBoardResult;
};

// DELETE BOARD
const remove = async (boardId: string): Promise<IBoard> => {
  const boardDeleteResult = await get(boardId);
  const boardRepository = getRepository(BoardEntity);

  const res = await boardRepository.delete(boardId);

  if (!res.affected) {
    throw new Error("[App] Can't Delete Board!");
  }

  // DELETE BOARDS TASKS
  await tasksService.deleteBoardsTasks(boardId);
  return boardDeleteResult;
};

export const boardsService = {
  getAll,
  get,
  create,
  remove,
  update,
};
