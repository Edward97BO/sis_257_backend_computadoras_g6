import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarritoDto } from './dto/create-carrito.dto';
import { UpdateCarritoDto } from './dto/update-carrito.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrito } from './entities/carrito.entity';

@Injectable()
export class CarritosService {
  constructor(
    @InjectRepository(Carrito)
    private categoriaRepository: Repository<Carrito>,
  ) {}

  async create(createCarritoDto: CreateCarritoDto): Promise<Carrito> {
    const existeCarrito = await this.categoriaRepository.findOneBy({
      codigo: createCarritoDto.codigo,
    });

    if (existeCarrito) {
      throw new ConflictException('El carrito ya existe');
    }
    return this.categoriaRepository.save({
      codigo: createCarritoDto.codigo.trim(),
      cantidad: createCarritoDto.cantidad,
      precio: createCarritoDto.precio,
    });
  }

  async findAll(): Promise<Carrito[]> {
    return this.categoriaRepository.find();
  }

  async findOne(id: number): Promise<Carrito> {
    const categoria = await this.categoriaRepository.findOneBy({ id });
    if (!categoria) {
      throw new NotFoundException(`No existe el Carrito ${id}`);
    }
    return categoria;
  }

  async update(
    id: number,
    updateCarritoDto: UpdateCarritoDto,
  ): Promise<Carrito> {
    const categoria = await this.categoriaRepository.findOneBy({ id });
    if (!categoria) {
      throw new NotFoundException(`No existe el Carrito ${id}`);
    }
    const categoriaUpdate = Object.assign(categoria, updateCarritoDto);
    return this.categoriaRepository.save(categoriaUpdate);
  }

  async remove(id: number) {
    const categoria = await this.categoriaRepository.findOneBy({ id });
    if (!categoria) {
      throw new NotFoundException(`No existe el Carrito ${id}`);
    }
    return this.categoriaRepository.delete(id);
  }
}
