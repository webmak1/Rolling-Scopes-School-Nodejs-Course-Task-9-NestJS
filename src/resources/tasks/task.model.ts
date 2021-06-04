// @ts-check

import { v4 as uuidv4 } from 'uuid';

interface ITaskGeneral {
  title: string;
  order: string;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string;
}

export interface ITask extends ITaskGeneral {
  id: string;
}

export interface ITaskInput extends ITaskGeneral {
  id: string | undefined;
}

export class Task implements ITask {
  public id;
  public title;
  public order;
  public description;
  public userId;
  public boardId;
  public columnId;

  constructor({
    id = uuidv4(),
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  }: ITaskInput) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task: ITask): ITask {
    return task;
  }
}
