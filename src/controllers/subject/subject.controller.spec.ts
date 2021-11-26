import { Test, TestingModule } from '@nestjs/testing';
import { SubjectController } from './subject.controller';
import { SubjectService } from '../../services/subject/subject.service';
import { SubjectModule } from '../../services/subject/subject.module';

describe('SubjectController', () => {
  let controller: SubjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SubjectModule],
      controllers: [SubjectController],
      providers: [SubjectController],
    }).compile();

    controller = module.get<SubjectController>(SubjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
