import { Test, TestingModule } from '@nestjs/testing';
// import { MockContext, Context, createMockContext } from '../../database/prisma-context'
import { LoggerModule } from '../logger/logger.module';
import { MyLogger } from '../logger/logger.service';
import { SubjectService } from './subject.service';
import { prismaMock } from '../../database/prisma-singleton'
import { PrismaService } from '../../database/prisma.service';
import { Subject } from '@prisma/client'
describe('SubjectService', () => {
  let service: SubjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubjectService, PrismaService, MyLogger],

    })
      .overrideProvider(PrismaService).useValue(prismaMock)
      .compile();

    service = module.get<SubjectService>(SubjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create a user', async () => {
    const addSubjectModel = {
      title: 'create test subj',
      isVisible: true, type: 0,
      authorId: null, id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      subtitle: null,
      content: null,
    } as Subject

    const expected = {
      ...addSubjectModel
    }

    prismaMock.subject.create.mockResolvedValue(addSubjectModel);

    const actual = await service.create(addSubjectModel)

    console.log({ actual })

    expect(actual).toEqual(expected)
  })
  it(('should update a user'), async () => {
    const updateSubjectModel = {
      title: 'create test subj',
      id: 1,
      subtitle: null,
      isVisible: true,
      content: null,
      type: 0,
      authorId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const expected = {
      ...updateSubjectModel
    }
    prismaMock.subject.update.mockResolvedValue(updateSubjectModel);
    const actual = await service.update(updateSubjectModel);
    console.log({ actual })
    expect(actual).toEqual(expected)
  })
});
