import { IsString, IsOptional } from 'class-validator';

export class TodoDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
