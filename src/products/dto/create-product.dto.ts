import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  //id: number;
  @ApiProperty()
  product_name: string;

  @ApiProperty()
  product_sku: string;

  @ApiProperty()
  product_description: string;

  @ApiProperty()
  product_image: string;

  @ApiProperty()
  product_category: string;
}
