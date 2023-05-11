import { IsString } from 'class-validator';

export class CreateIssueDto {
    @IsString()
    title: string;

    @IsString()
    description: string;
}