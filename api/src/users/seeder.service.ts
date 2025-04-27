// users/seeder.service.ts
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(private readonly usersService: UsersService) {}

  async onApplicationBootstrap() {
    const adminEmail = 'ivanov@o.kg';

    const existingAdmin = await this.usersService.findOneByEmail(adminEmail);
    if (!existingAdmin) {
      const password = await bcrypt.hash('timur123', 10);
      await this.usersService.create({
        email: adminEmail,
        password,
        role: 'admin',
      });
      console.log('🛡️ Админ пользователь создан!');
    } else {
      console.log('✅ Админ пользователь уже существует');
    }
  }
}
