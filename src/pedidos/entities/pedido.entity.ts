import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Solicitud } from 'src/solicitudes/entities/solicitud.entity';

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10, nullable: false })
  codigo: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  estado: string;

  @Column({ name: 'id_cliente' })
  idCliente: number;

  @CreateDateColumn({ name: 'fecha_pedido' })
  fechaPedido: Date;

  @ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
  @JoinColumn({ name: 'id_cliente', referencedColumnName: 'id' })
  cliente: Cliente;

  @OneToMany(() => Solicitud, (solicitud) => solicitud.pedido)
  solicitudes: Solicitud[];
}
