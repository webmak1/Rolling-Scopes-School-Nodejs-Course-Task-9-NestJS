import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly order: number;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly userId: string;

  @IsNotEmpty()
  readonly boardId: string;

  @IsNotEmpty()
  readonly columnId: string;
}
