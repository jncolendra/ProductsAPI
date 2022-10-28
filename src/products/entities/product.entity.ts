import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_name: string;

  @Column({ unique: true })
  product_sku: string;

  @Column()
  product_description: string;

  @Column()
  product_image: string;

  @Column()
  product_category: string;
}
