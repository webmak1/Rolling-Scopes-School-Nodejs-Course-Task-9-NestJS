import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from 'boards/entities/board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
  ) {}

  async getAllBoards() {
    const boards = await this.boardRepository.find({});
    return boards;
  }

  async getBoardById(boardId: string) {
    const board = await this.boardRepository.findOne(boardId);
    if (!board) {
      throw new Error('[App] Board not found!');
    }
    return board;
  }

  async createBoard(createBoardDto: CreateBoardDto) {
    const createdBoard = await this.boardRepository.save(createBoardDto);
    if (!createdBoard) {
      throw new Error("[App] Can't create Board!");
    }
    return createdBoard;
  }

  async updateBoard(boardId: string, updateBoardDto: UpdateBoardDto) {
    const updateBoard = await this.boardRepository.update(
      boardId,
      updateBoardDto,
    );
    if (!updateBoard.affected) {
      throw new Error("[App] Can't Update Board!");
    }
    const updatedBoard = await this.getBoardById(boardId);
    return updatedBoard;
  }

  async removeBoard(boardId: string) {
    const deletedBoard = await this.getBoardById(boardId);
    const res = await this.boardRepository.delete(boardId);
    if (!res.affected) {
      throw new Error('[App] Cant Delete Board!');
    }
    return deletedBoard;
  }
}
