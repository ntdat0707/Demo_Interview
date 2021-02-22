import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentEntity } from '../entities/agent.entity';
import { AgentController } from './agent.controller';
import { AgentService } from './agent.service';

@Module({
  imports: [TypeOrmModule.forFeature([AgentEntity])],
  controllers: [AgentController],
  providers: [AgentService],
})
export class AgentModule {}
