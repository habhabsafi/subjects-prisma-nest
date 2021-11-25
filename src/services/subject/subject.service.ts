import { Get, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service'
import { SubjectSortProps, EditSubjectModel, AddSubjectModel, FilteredSubjects, Subject as SubjectDto, SubjectFilter, Subject } from '../../dtos/subject.dto'
import { Subject as SubjectModel } from '.prisma/client';


@Injectable()
export class SubjectService {
  constructor(private readonly prismaService: PrismaService) {

  }
  async create(addSubjectModel: AddSubjectModel) {

    const addedSubject = await this.prismaService.subject.create({ data: addSubjectModel })
    return this.subjectMap(addedSubject);
  }


  async GetById(id: number): Promise<SubjectDto | undefined> {
    const record = await this.prismaService.subject.findUnique({
      where: {
        id: +id
      }
    });
    return this.subjectMap(record);
  }
  async GetAllFiltered(subjectFilter: SubjectFilter): Promise<FilteredSubjects> {

    const typeQuery = subjectFilter.type ? {
      type: subjectFilter.type
    } : {}

    const subjectFilterKeyword = subjectFilter.keyword
    const keywordQuery = subjectFilterKeyword ? {
      OR: [
        { title: { contains: subjectFilterKeyword } },
        { subtitle: { contains: subjectFilterKeyword } }
      ]
    } : {}

    const order = subjectFilter.sortDesc ? 'desc' : 'asc';
    let orderBy = {}
    switch (subjectFilter.subjectSortBy) {
      case SubjectSortProps.Title:
        orderBy = { title: order }
        break;
      case SubjectSortProps.Subtitle:
        orderBy = { subtitle: order }
        break;
      default:
        orderBy = { id: order }
    }
    const resultsFromDb = await this.prismaService.subject.findMany(
      {
        where: {
          ...keywordQuery,
          ...typeQuery
        },
        take: subjectFilter.countPerPage,
        skip: subjectFilter.page * subjectFilter.countPerPage,
        orderBy: {
          ...orderBy
        },
      }
    )
    const mappedResults = resultsFromDb.map((subject) => {
      return this.subjectMap(subject)
    })
    return {
      subjects: mappedResults,
      totalCount: mappedResults.length
    }

  }

  async update(editSubjectModel: EditSubjectModel): Promise<SubjectDto> {
    const updatedSubject = await this.prismaService.subject.update({
      where: {
        id: editSubjectModel.id
      },
      data: {
        ...editSubjectModel
      }
    })
    return this.subjectMap(updatedSubject)
  }

  async delete(id: number) {
    return await this.prismaService.subject.delete({
      where: {
        id: +id
      }
    });
  }

  private subjectMap(subject: SubjectModel | undefined): SubjectDto | undefined {

    if (!subject)
      return undefined
    const parsedDto = new SubjectDto();

    parsedDto.subtitle = subject.subtitle
    parsedDto.title = subject.title
    parsedDto.content = subject.content
    parsedDto.id = subject.id
    parsedDto.type = subject.type
    parsedDto.isVisible = subject.isVisible
    parsedDto.createdAt = subject.createdAt
    parsedDto.subtitle = subject.subtitle
    return parsedDto
  }
}
