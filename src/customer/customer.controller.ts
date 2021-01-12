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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateCustomerPipe } from '../lib/validatePipe/customer/updateCustomerPipe.class';
import { CheckUUID } from '../lib/validatePipe/uuidPipe.class';
import { GetUser } from '../auth/get-user.decorator';
import { HttpExceptionFilter } from '../exception/httpException.filter';
import { CheckUnSignIntPipe } from '../lib/validatePipe/checkIntegerPipe.class';
import {
  ActiveCustomerInput,
  AddProductInCartInput,
  CreateCustomerInput,
  UpdateCustomerAvatarInput,
  UpdateCustomerInput,
} from './customer.dto';
import { CustomerService } from './customer.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DELETE_CUSTOMER, FILTER_CUSTOMER } from '../role/codePermission';
import { Roles } from '../role/role.decorators';
import { RolesGuard } from '../role/roles.guard';
import { AddProductInCartPipe } from '../lib/validatePipe/customer/addProductInCard.class';
@Controller('customer')
@ApiTags('Customer')
@UseFilters(new HttpExceptionFilter())
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Put('/update-avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UpdateCustomerAvatarInput,
  })
  async updateCustomerAvatar(@GetUser('userId') customerId: string, @UploadedFile() avatar: any) {
    return await this.customerService.updateCustomerAvatar(customerId, avatar);
  }

  @Get('/search/:searchValue')
  @ApiParam({ name: 'searchValue', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([FILTER_CUSTOMER])
  async filterCustomer(
    @Param('searchValue') searchValue: string,
    @Query('page', new CheckUnSignIntPipe()) page: number,
    @Query('limit', new CheckUnSignIntPipe()) limit: number,
  ) {
    return await this.customerService.filterCustomer(searchValue, page, limit);
  }

  @Put('/update-customer')
  async updateCustomer(
    @GetUser('userId') customerId: string,
    @Body(new UpdateCustomerPipe()) updateCustomerInput: UpdateCustomerInput,
  ) {
    return await this.customerService.updateCustomer(customerId, updateCustomerInput);
  }

  @Get('/check-email-exist/:email')
  async checkEmailExist(@Param('email') email: string) {
    return await this.customerService.checkEmailExist(email);
  }

  @Get('/check-phone-exist/:phone')
  async checkPhoneExist(@Param('phone') phone: string) {
    return await this.customerService.checkPhoneExist(phone);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([DELETE_CUSTOMER])
  async deleteCustomer(@Param('id', new CheckUUID()) id: string) {
    return await this.customerService.deleteCustomer(id);
  }

  @Post('add-product-in-cart')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles([FILTER_ORDER])
  async addProductInCart(
    @GetUser('userId') customerId: string,
    @Body(new AddProductInCartPipe()) addProductInCartInput: AddProductInCartInput,
  ) {
    return await this.customerService.addProductInCart(customerId, addProductInCartInput);
  }

  @Post('create-customer')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles([CREATE_CUSTOMER])
  async createCustomer(@Body(new AddProductInCartPipe()) createCustomerInput: CreateCustomerInput) {
    return await this.customerService.createCustomer(createCustomerInput);
  }

  @Post('active-customer')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles([CREATE_CUSTOMER])
  async activeCustomer(activeCustomerInput: ActiveCustomerInput) {
    return await this.customerService.activeCustomer(activeCustomerInput);
  }
}
