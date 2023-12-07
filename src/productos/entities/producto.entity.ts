import { Carrito } from 'src/carritos/entities/carrito.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Compra } from 'src/compras/entities/compra.entity';
import { Solicitud } from 'src/solicitudes/entities/solicitud.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  descripcion: string;

  @Column({ type: 'decimal', nullable: false })
  precio: number;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @Column({ type: 'varchar', length: 300, nullable: false })
  url: string;

  @OneToMany(() => Solicitud, (solicitud) => solicitud.producto)
  solicitudes: Solicitud[];

  @Column({ name: 'id_categoria' })
  idCategoria: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  @JoinColumn({ name: 'id_categoria', referencedColumnName: 'id' })
  categoria: Categoria;

  @ManyToMany(() => Carrito, (carrito) => carrito.productos)
  carritos: Carrito[];

  @OneToMany(() => Compra, (compra) => compra.carrito)
  compras: Compra[];
}
