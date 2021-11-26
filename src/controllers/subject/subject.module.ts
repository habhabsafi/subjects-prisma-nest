import { Module } from '@nestjs/common';
import { SubjectController } from './subject.controller';
import { SubjectModule } from '../../services/subject/subject.module';

@Module({
  imports: [SubjectModule],
  controllers: [SubjectController],
  providers: [SubjectController],
  exports: [SubjectController]
})
export class SubjectControllerModule { }
