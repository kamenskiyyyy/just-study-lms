import { Controller } from '@nestjs/common';
import { HomeworkService } from './homework.service';

@Controller()
export class HomeworkController {
  constructor(private readonly homeworkService: HomeworkService) {}


}
