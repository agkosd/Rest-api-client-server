import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Issue } from './issue.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IssueService {
  constructor(@InjectRepository(Issue) private repo: Repository<Issue>) { }

  create(title: string, description: string) {
    const issue = this.repo.create({ title, description });
    return this.repo.save(issue);
  }

  async findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async findAll(): Promise<Issue[]> {
    return this.repo.find();
  }

  async update(id: number, attrs: Partial<Issue>) {
    const issue = await this.findOne(id);

    if (!issue) {
      throw new NotFoundException('issue not found');
    }
    Object.assign(issue, attrs);

    return this.repo.save(issue);
  }

  async remove(id: number) {
    const issue = await this.findOne(id);
    if (!issue) {
      throw new NotFoundException('issue not found');
    }

    return this.repo.remove(issue);
  }
}
