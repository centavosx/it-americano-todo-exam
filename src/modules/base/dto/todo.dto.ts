import { IsString, IsOptional } from 'class-validator';

export class TodoDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
