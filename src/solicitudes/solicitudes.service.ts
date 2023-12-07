import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { Solicitud } from './entities/solicitud.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from 'src/productos/entities/producto.entity';
import { Pedido } from 'src/pedidos/entities/pedido.entity';

@Injectable()
export class SolicitudesService {
  constructor(
    @InjectRepository(Solicitud)
    private solicitudRepository: Repository<Solicitud>,
  ) {}

  async create(createSolicitudDto: CreateSolicitudDto): Promise<Solicitud> {
    const existeSolicitud = await this.solicitudRepository.findOneBy({
      codigo: createSolicitudDto.codigo,
      pedido: { id: createSolicitudDto.idPedido },
    });

    if (existeSolicitud) {
      throw new ConflictException('El pedido en línea ya existe');
    }
    return this.solicitudRepository.save({
      codigo: createSolicitudDto.codigo.trim(),
      cantidad: createSolicitudDto.cantidad,
      precio: createSolicitudDto.precio,
      pedido: { id: createSolicitudDto.idPedido },
      producto: { id: createSolicitudDto.idProducto },
    });
  }

  async findAll(): Promise<Solicitud[]> {
    return this.solicitudRepository.find({ relations: ['pedido', 'producto'] });
  }

  async findOne(id: number): Promise<Solicitud> {
    const solicitud = await this.solicitudRepository.findOne({
      where: { id },
      relations: ['pedido', 'producto'],
    });
    if (!solicitud) {
      throw new NotFoundException(`No existe el Pedido en Línea ${id}`);
    }
    return solicitud;
  }

  async update(
    id: number,
    updateSolicitudDto: UpdateSolicitudDto,
  ): Promise<Solicitud> {
    const solicitud = await this.solicitudRepository.findOneBy({ id });
    if (!solicitud) {
      throw new NotFoundException(`No existe el Pedido en Línea${id}`);
    }
    const solicitudUpdate = Object.assign(solicitud, updateSolicitudDto);
    solicitudUpdate.pedido = { id: updateSolicitudDto.idPedido } as Pedido;
    solicitudUpdate.producto = {
      id: updateSolicitudDto.idProducto,
    } as Producto;
    return this.solicitudRepository.save(solicitudUpdate);
  }

  async remove(id: number) {
    const solicitud = await this.solicitudRepository.findOneBy({ id });
    if (!solicitud) {
      throw new NotFoundException(`No existe el Pedido en Línea ${id}`);
    }
    return this.solicitudRepository.delete(id);
  }
}
