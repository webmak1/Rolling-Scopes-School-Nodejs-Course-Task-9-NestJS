import { Injectable } from '@nestjs/common';
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

  getAllBoards() {
    return `This action returns all boards`;
  }

  getBoardById(id: number) {
    return `This action returns a #${id} board`;
  }

  createBoard(createBoardDto: CreateBoardDto) {
    return 'This action adds a new board';
  }

  updateBoard(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  removeBoard(id: number) {
    return `This action removes a #${id} board`;
  }
}
