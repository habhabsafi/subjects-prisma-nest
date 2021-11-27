import { Test, TestingModule } from '@nestjs/testing';
import { SubjectController } from './subject.controller';
import { SubjectService } from '../../services/subject/subject.service';
// import { SubjectModule } from '../../services/subject/subject.module';

describe('SubjectController', () => {
  let controller: SubjectController;
  const mockSubjectsService = {
    create: jest.fn(dto => {
      return {
        id: Math.random(),
        ...dto
      }
    }),
    update: jest.fn(dto => {
      return {
        ...dto
      }
    })
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [SubjectModule],
      controllers: [SubjectController],
      providers: [SubjectController, SubjectService],
    }).overrideProvider(SubjectService).useValue(mockSubjectsService).compile();

    controller = module.get<SubjectController>(SubjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it("should create a subject", async () => {
    const createSubject_Actual = await controller.create({
      title: 'test Subject',
      isVisible: true, type: 0
    })
    const expected = {
      record: {
        id: expect.any(Number),
        title: "test Subject",
        isVisible: true,
        type: 0
      }


    }
    expect(createSubject_Actual)
      .toEqual(expected)
  })
  it("should update a subject", async () => {
    const updateSubject_Actual = await controller.update({
      id: 1,
      title: 'test Subject',
      isVisible: true, type: 0
    })
    const expected = {
      record: {
        id: expect.any(Number),
        title: "test Subject",
        isVisible: true,
        type: 0
      }

    }
    expect(updateSubject_Actual)
      .toEqual(expected)
  })

});
