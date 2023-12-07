import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Compra } from './entities/compra.entity';
import { Repository } from 'typeorm';
import { Carrito } from 'src/carritos/entities/carrito.entity';
import { Producto } from 'src/productos/entities/producto.entity';

@Injectable()
export class ComprasService {
  constructor(
    @InjectRepository(Compra)
    private solicitudRepository: Repository<Compra>,
  ) {}

  async create(createCompraDto: CreateCompraDto): Promise<Compra> {
    const existeCompra = await this.solicitudRepository.findOneBy({
      carrito: { id: createCompraDto.idCarrito },
      producto: { id: createCompraDto.idProducto },
    });

    if (existeCompra) {
      throw new ConflictException('La compra ya existe');
    }
    return this.solicitudRepository.save({
      carrito: { id: createCompraDto.idCarrito },
      producto: { id: createCompraDto.idProducto },
    });
  }

  async findAll(): Promise<Compra[]> {
    return this.solicitudRepository.find({
      relations: ['carrito', 'producto'],
    });
  }

  async findOne(id: number): Promise<Compra> {
    const solicitud = await this.solicitudRepository.findOne({
      where: { id },
      relations: ['carrito', 'producto'],
    });
    if (!solicitud) {
      throw new NotFoundException(`No existe el Carrito ${id}`);
    }
    return solicitud;
  }

  async update(id: number, updateCompraDto: UpdateCompraDto): Promise<Compra> {
    const solicitud = await this.solicitudRepository.findOneBy({ id });
    if (!solicitud) {
      throw new NotFoundException(`No existe el Carrito ${id}`);
    }
    const solicitudUpdate = Object.assign(solicitud, updateCompraDto);
    solicitudUpdate.carrito = { id: updateCompraDto.idCarrito } as Carrito;
    solicitudUpdate.producto = {
      id: updateCompraDto.idProducto,
    } as Producto;
    return this.solicitudRepository.save(solicitudUpdate);
  }

  async remove(id: number) {
    const solicitud = await this.solicitudRepository.findOneBy({ id });
    if (!solicitud) {
      throw new NotFoundException(`No existe el Carrito ${id}`);
    }
    return this.solicitudRepository.delete(id);
  }
}
