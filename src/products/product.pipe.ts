import { Injectable, PipeTransform } from '@nestjs/common';
import { ProductSchema } from './dto/product.joi-schema';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class ProductValidationPipe implements PipeTransform {
  transform(value: any) {
    const { error } = ProductSchema.validate(value);
    const errorMessages = error?.details.map((d) => d.message);
    if (error) {
      throw new BadRequestException(error, errorMessages.join(','));
    }
    return value;
  }
}
