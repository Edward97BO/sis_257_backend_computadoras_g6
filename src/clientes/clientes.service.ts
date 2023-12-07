import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const existeCliente = await this.clienteRepository.findOneBy({
      usuario: createClienteDto.usuario,
    });

    if (existeCliente) {
      throw new ConflictException('El cliente ya existe');
    }

    const cliente = new Cliente();
    cliente.usuario = createClienteDto.usuario.trim();
    cliente.clave = process.env.DEFAULT_PASSWORD;
    cliente.nombre = createClienteDto.nombre.trim();
    cliente.apellidos = createClienteDto.apellidos.trim();
    cliente.email = createClienteDto.email.trim();
    cliente.direccion = createClienteDto.direccion.trim();
    cliente.telefono = createClienteDto.telefono;

    const clienteBd = await this.clienteRepository.save(cliente);
    delete cliente.clave;
    return clienteBd;
  }

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOneBy({ id });
    if (!cliente) {
      throw new NotFoundException(`No existe el cliente ${id}`);
    }
    return cliente;
  }

  async update(
    id: number,
    updateClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOneBy({ id });
    if (!cliente) {
      throw new NotFoundException(`No existe el cliente ${id}`);
    }
    const clienteUpdate = Object.assign(cliente, updateClienteDto);
    return this.clienteRepository.save(clienteUpdate);
  }

  async remove(id: number) {
    const cliente = await this.clienteRepository.findOneBy({ id });
    if (!cliente) {
      throw new NotFoundException(`No existe el cliente ${id}`);
    }
    return this.clienteRepository.delete(id);
  }
}
