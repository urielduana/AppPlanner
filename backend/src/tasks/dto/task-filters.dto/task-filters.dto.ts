import { IsOptional, IsBoolean, IsString, IsDateString } from 'class-validator';

export class TaskFiltersDto {
  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
