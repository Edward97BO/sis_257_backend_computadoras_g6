import { Carrito } from 'src/carritos/entities/carrito.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('compras')
export class Compra {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_carrito' })
  idCarrito: number;

  @Column({ name: 'id_producto' })
  idProducto: number;

  @ManyToOne(() => Carrito, (carrito) => carrito.compras)
  @JoinColumn({ name: 'id_carrito', referencedColumnName: 'id' })
  carrito: Carrito;

  @ManyToOne(() => Producto, (producto) => producto.compras)
  @JoinColumn({ name: 'id_producto', referencedColumnName: 'id' })
  producto: Producto;
}
