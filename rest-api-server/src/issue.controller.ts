import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { IssueService } from './issue.service';
import { CreateIssueDto } from './dtos/create-issue.dto';
import { UpdateIssueDto } from './dtos/update-issue.dto';

@Controller('/api/v1/issues')
export class IssueController {
  constructor(private readonly issueService: IssueService) { }

  @Post()
  async createIssue(@Body() body: CreateIssueDto) {
    const issue = await this.issueService.create(body.title, body.description)
    return issue;
  }

  @Get('/:id')
  async getIssue(@Param('id') id: string) {
    const issue = await this.issueService.findOne(parseInt(id));
    if (!issue) {
      throw new NotFoundException('issue not found');
    }

    return issue;
  }

  @Get('/')
  getIssues() {
    return this.issueService.findAll();
  }

  @Patch('/:id')
  updateIssue(@Param('id') id: string, @Body() body: UpdateIssueDto) {
    return this.issueService.update(parseInt(id), body);
  }

  @Delete('/:id')
  deleteIssue(@Param('id') id: string) {
    return this.issueService.remove(parseInt(id));
  }
}
