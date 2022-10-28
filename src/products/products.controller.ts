import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProductInterceptor } from './product.interceptor';
import { UsePipes } from '@nestjs/common/decorators';
import { ProductValidationPipe } from './product.pipe';

@ApiTags('Products API')
@Controller('products')
@UseInterceptors(new ProductInterceptor())
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UsePipes(ProductValidationPipe)
  @HttpCode(201)
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.create(createProductDto);

    return {
      result: product,
      message: 'Record Created Succesfully',
    };
  }

  @Get()
  @HttpCode(200)
  async findAll() {
    return {
      result: await this.productsService.findAll(),
      message: 'Records Retrieved Succesfully',
    };
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    const result = await this.productsService.findOne(+id);
    if (!result) {
      throw new NotFoundException({
        status: 404,
        message: 'Record Not Found',
      });
    }

    return {
      result: result,
      message: 'Record Retrieved Succesfully',
    };
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body(new ProductValidationPipe()) updateProductDto: UpdateProductDto,
  ) {
    return {
      result: await this.productsService.update(+id, updateProductDto),
      message: 'Record Updated Succesfully',
    };
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id') id: string) {
    return {
      result: await this.productsService.remove(+id),
      message: 'Record Deleted Succesfully',
    };
  }
}
