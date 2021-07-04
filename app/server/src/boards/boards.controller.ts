import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  async getAllBoards() {
    return this.boardsService.getAllBoards();
  }

  @Post()
  async createBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get(':id')
  async getBoardById(@Res() res: Response, @Param('id') boardId: string) {
    try {
      return res
        .status(StatusCodes.OK)
        .json(await this.boardsService.getBoardById(boardId));
    } catch (err) {
      return res.status(StatusCodes.NOT_FOUND).send('Something bad happened!');
    }
  }

  @Put(':id')
  async updateBoard(
    @Param('id') boardId: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardsService.updateBoard(boardId, updateBoardDto);
  }

  @Delete(':id')
  async removeBoard(@Param('id') boardId: string) {
    return this.boardsService.removeBoard(boardId);
  }
}
