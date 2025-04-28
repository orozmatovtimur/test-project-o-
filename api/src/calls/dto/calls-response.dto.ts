import { Call } from '../../entities/calls.entity';

export class CallsResponseDto {
  data: Call[];
  total: number;
}
