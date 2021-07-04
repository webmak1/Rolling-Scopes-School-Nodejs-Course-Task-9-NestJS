import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  createBoard(@Body() createBoardDto: CreateBoardDto) {
    console.log('Create Board');
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get()
  getAllBoards() {
    return this.boardsService.getAllBoards();
  }

  @Get(':id')
  getBoardById(@Param('id') id: string) {
    return this.boardsService.getBoardById(+id);
  }

  @Put(':id')
  updateBoard(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.updateBoard(id, updateBoardDto);
  }

  @Delete(':id')
  removeBoard(@Param('id') id: string) {
    return this.boardsService.removeBoard(id);
  }
}
