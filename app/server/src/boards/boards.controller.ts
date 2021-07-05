import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { HttpExceptionFilter } from 'filters/http-exception.filter';
import { AuthGuard } from 'guards/auth.guard';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  @UseGuards(AuthGuard)
  @UseFilters(new HttpExceptionFilter())
  async getAllBoards() {
    return this.boardsService.getAllBoards();
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseFilters(new HttpExceptionFilter())
  async createBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @UseFilters(new HttpExceptionFilter())
  async getBoardById(@Res() res: Response, @Param('id') boardId: string) {
    try {
      return res
        .status(HttpStatus.OK)
        .send(await this.boardsService.getBoardById(boardId));
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).send('Something bad happened!');
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @UseFilters(new HttpExceptionFilter())
  async updateBoard(
    @Param('id') boardId: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardsService.updateBoard(boardId, updateBoardDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @UseFilters(new HttpExceptionFilter())
  async removeBoard(@Param('id') boardId: string) {
    return this.boardsService.removeBoard(boardId);
  }
}
