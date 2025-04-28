// import { Injectable } from '@nestjs/common';
// import { Call } from '../entities/calls.entity'; // предположим, у тебя есть такая сущность
// import { FilterCallsDto } from '../calls/dto/filter-calls.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import type { Repository } from 'typeorm';
// import { CallsResponseDto } from '../calls/dto/calls-response.dto';

// @Injectable()
// export class CallsService {
//   constructor(
//     @InjectRepository(Call)
//     private readonly callRepository: Repository<Call>,
//   ) {}
//   async getFilteredCalls(filters: FilterCallsDto): Promise<CallsResponseDto> {
//     const query = this.callRepository.createQueryBuilder('call');
  
//     if (filters.startDate && filters.endDate) {
//       query.andWhere('call.start_time BETWEEN :start AND :end', {
//         start: filters.startDate,
//         end: filters.endDate,
//       });
//     }
  
//     if (filters.statuses && filters.statuses.length > 0) {
//       query.andWhere('call.status IN (:...statuses)', { statuses: filters.statuses });
//     }
  
//     if (filters.categories && filters.categories.length > 0) {
//       query.andWhere('call.category IN (:...categories)', { categories: filters.categories });
//     }
  
//     if (filters.agentId) {
//       query.andWhere('call.agent_id = :agentId', { agentId: filters.agentId });
//     }
  
//     query.orderBy('call.startTime', 'DESC');

  
//     query.skip((filters.page - 1) * filters.limit).take(filters.limit);
  
//     const [calls, total] = await query.getManyAndCount();
  
//     return { data: calls, total };
//   }
// }

import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { join } from 'path';
import { FilterCallsDto } from './dto/filter-calls.dto';
import { CallsResponseDto } from './dto/calls-response.dto';

@Injectable()
export class CallsService {
  async getFilteredCalls(filters: FilterCallsDto): Promise<CallsResponseDto> {
    const filePath = join(__dirname, '../data/mock_data.json');
    const rawData = await fs.readFile(filePath, 'utf-8');
    const allCalls = JSON.parse(rawData);

    const filtered = allCalls.slice((filters.page - 1) * filters.limit, filters.page * filters.limit);

    return {
      data: filtered,
      total: allCalls.length,
    };
  }
}
