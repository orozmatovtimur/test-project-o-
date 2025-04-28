import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as mockData from '../data/mock_data.json';


// @Injectable()
// export class DashboardService {
//   getMockData() {
//     const filePath = path.join(__dirname, '..', 'data', 'mock_data.json');
//     const data = fs.readFileSync(filePath, 'utf-8');
//     return JSON.parse(data);
//   }
// }

@Injectable()
export class DashboardService {
  getMockData() {
    return mockData;
  }
}