import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../../database/prisma.module';
import { LoggerModule } from '../logger/logger.module';
import { SubjectService } from './subject.service';

describe('SubjectService', () => {
  let service: SubjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubjectService],
      imports: [PrismaModule, LoggerModule],

    }).compile();

    service = module.get<SubjectService>(SubjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
