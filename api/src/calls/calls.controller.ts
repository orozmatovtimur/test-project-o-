import { Controller, Get, Query } from '@nestjs/common';
import { CallsService } from './calls.service';
import { FilterCallsDto } from './dto/filter-calls.dto';

@Controller('calls')
export class CallsController {
  constructor(private readonly dataService: CallsService) {}

  @Get()
  async getCalls(@Query() filters: FilterCallsDto) {
    return this.dataService.getFilteredCalls(filters);
  }
}
