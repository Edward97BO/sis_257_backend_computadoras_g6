import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { Categoria } from 'src/categorias/entities/categoria.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const existeProducto = await this.productoRepository.findOneBy({
      nombre: createProductoDto.nombre,
      categoria: { id: createProductoDto.idCategoria },
    });

    if (existeProducto) {
      throw new ConflictException('El producto ya existe');
    }
    return this.productoRepository.save({
      nombre: createProductoDto.nombre.trim(),
      descripcion: createProductoDto.descripcion.trim(),
      url: createProductoDto.url.trim(),
      precio: createProductoDto.precio,
      stock: createProductoDto.stock,
      categoria: { id: createProductoDto.idCategoria },
    });
  }

  async findAll(): Promise<Producto[]> {
    return this.productoRepository.find({ relations: ['categoria'] });
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });
    if (!producto) {
      throw new NotFoundException(`No existe el producto ${id}`);
    }
    return producto;
  }

  async update(
    id: number,
    updateProductoDto: UpdateProductoDto,
  ): Promise<Producto> {
    const producto = await this.productoRepository.findOneBy({ id });
    if (!producto) {
      throw new NotFoundException(`No existe el producto ${id}`);
    }
    const productoUpdate = Object.assign(producto, updateProductoDto);
    productoUpdate.categoria = {
      id: updateProductoDto.idCategoria,
    } as Categoria;
    return this.productoRepository.save(productoUpdate);
  }

  async remove(id: number) {
    const producto = await this.productoRepository.findOneBy({ id });
    if (!producto) {
      throw new NotFoundException(`No existe el producto ${id}`);
    }
    return this.productoRepository.delete(id);
  }
}
