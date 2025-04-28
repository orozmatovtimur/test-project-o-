// src/entities/calls.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('calls')
export class Call {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  callerNumber: string;

  @Column()
  start_time: Date;

  @Column({ nullable: true })
  end_time: Date;

  @Column()
  status: string;

  @Column()
  category: string;

  @Column()
  agent_id: number;
}
