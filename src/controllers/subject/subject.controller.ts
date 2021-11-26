import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { SubjectService } from '../../services/subject/subject.service';
import { SubjectFilter, Subject, AddSubjectModel, EditSubjectModel } from '../../dtos/subject.dto';
import { ClientResponseModel } from '../../common/ClientResponseModel';
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) { }

  @Post()
  async create(@Body() addSubjectModel: AddSubjectModel): Promise<ClientResponseModel<Subject>> {
    const result = await this.subjectService.create(addSubjectModel)
    const AddedSubjectResponse = new ClientResponseModel<Subject>()
    AddedSubjectResponse.record = result
    return AddedSubjectResponse;
  }

  @Put()
  async update(@Body() editSubjectModel: EditSubjectModel): Promise<ClientResponseModel<Subject>> {
    const result = await this.subjectService.update(editSubjectModel)
    const updatedSubjectResponse = new ClientResponseModel<Subject>()
    updatedSubjectResponse.record = result

    return updatedSubjectResponse;
  }
  @Get("errorlogger")
  async errorLogger(): Promise<any> {
    this.subjectService.errorMethod();
  }
  @Delete(':id')
  async deleteSubject(@Param('id') id: number): Promise<boolean> {
    const result = await this.subjectService.delete(id)
    return result != null
  }

  @Get(":id")
  async getById(@Param('id') id: number): Promise<Subject> {
    return await this.subjectService.GetById(id);
  }


  @Post("getAllFiltered")
  async GetAllFiltered(
    @Body() subjectFilter: SubjectFilter
  ): Promise<ClientResponseModel<Subject[]>> {

    const results = await this.subjectService.GetAllFiltered(subjectFilter)

    const getAllFilteredResponse = new ClientResponseModel<Subject[]>()
    getAllFilteredResponse.record = results.subjects
    getAllFilteredResponse.extraData = results.totalCount

    return getAllFilteredResponse;
  }
}
