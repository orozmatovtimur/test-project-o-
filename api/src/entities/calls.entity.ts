import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('calls')
export class Call {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  callerNumber: string;

  @Column()
  startTime: Date;

  @Column({ nullable: true })
  endTime: Date;

  @Column()
  status: string;

  @Column()
  category: string;

  @Column()
  agentId: string;
}
