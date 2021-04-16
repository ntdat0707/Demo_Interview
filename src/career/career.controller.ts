import { CreateCareerPipe } from './../lib/validatePipe/career/createCareerPipe.class';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../exception/httpException.filter';
import { CareerService } from './career.service';
import { CareerPictureInput, CreateCareerInput, UpdateCareerInput } from './career.dto';
import { UpdateCareerPipe } from '../lib/validatePipe/career/updateCareerPipe.class';
import { CheckUnSignIntPipe } from '../lib/validatePipe/checkIntegerPipe.class';
import { ConvertArray } from '../lib/validatePipe/convertArrayPipe.class';
import { FileInterceptor } from '@nestjs/platform-express';
import { CheckStatusFilterPipe } from '../lib/validatePipe/agent/statusFilterPipe.class';

@Controller('career')
@ApiTags('Career')
@UseFilters(new HttpExceptionFilter())
export class CareerController {
  constructor(private careerService: CareerService) {}

  @Post('/upload-image-career')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CareerPictureInput,
  })
  async uploadImageBlog(@UploadedFile() image: CareerPictureInput) {
    return await this.careerService.uploadImage(image);
  }

  @Get()
  @ApiQuery({ name: 'languageId', required: true })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'status', required: false, type: String, isArray: true })
  @ApiQuery({ name: 'countries', type: String, isArray: true, required: false })
  @ApiQuery({ name: 'searchValue', required: false })
  async getAllCareer(
    @Query('languageId') languageId: string,
    @Query('page', new CheckUnSignIntPipe()) page: number,
    @Query('limit', new CheckUnSignIntPipe()) limit: number,
    @Query('status', new ConvertArray(), new CheckStatusFilterPipe()) status: string[],
    @Query('countries', new ConvertArray()) countries: string[],
    @Query('searchValue') searchValue: string,
  ) {
    return await this.careerService.getAllCareer(languageId, page, limit, searchValue, status, countries);
  }

  @Get('/:code')
  @ApiQuery({ name: 'languageId', required: false })
  async getCareer(@Param('code') code: string, @Query('languageId') languageId: string) {
    return await this.careerService.getCareer(code, languageId);
  }

  @Post()
  @ApiBody({ type: [CreateCareerInput] })
  async createCareer(@Body(new CreateCareerPipe()) createCareerInput: [CreateCareerInput]) {
    return await this.careerService.createCareer(createCareerInput);
  }

  @Put('/:code')
  @ApiBody({ type: [UpdateCareerInput] })
  async updateCareer(
    @Param('code') code: string,
    @Body(new UpdateCareerPipe()) updateCareerInput: [UpdateCareerInput],
  ) {
    return await this.careerService.updateCareer(code, updateCareerInput);
  }

  @Delete('/:code')
  async deleteCareer(@Param('code') code: string) {
    return await this.careerService.deleteCareer(code);
  }
}
