import { IsNotEmpty, IsString } from 'class-validator';
import { Status } from '../task.types';

export class UpdateStatusDto {
  @IsString()
  @IsNotEmpty()
  status: Omit<Status, 'delete'>;
}
