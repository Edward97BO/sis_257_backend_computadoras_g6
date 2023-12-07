import { Compra } from 'src/compras/entities/compra.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('carritos')
export class Carrito {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  codigo: string;

  @Column({ type: 'int', nullable: false })
  cantidad: number;

  @Column({ type: 'decimal', nullable: false })
  precio: number;

  @ManyToMany(() => Producto, (producto) => producto.carritos)
  productos: Producto[];

  @OneToMany(() => Compra, (compra) => compra.producto)
  compras: Compra[];
}
