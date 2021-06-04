// @ts-check

import { v4 as uuidv4 } from 'uuid';
interface IBoardGeneral {
  title: string;
  columns: string;
}
export interface IBoard extends IBoardGeneral {
  id: string;
}

export interface IBoardInput extends IBoardGeneral {
  id: string | undefined;
}

export class Board implements IBoard {
  public id;
  public title;
  public columns;

  constructor({ id = uuidv4(), title, columns }: IBoardInput) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board: IBoard): IBoard {
    return board;
  }
}
