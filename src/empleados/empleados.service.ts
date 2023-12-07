import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empleado } from './entities/empleado.entity';

@Injectable()
export class EmpleadosService {
  constructor(
    @InjectRepository(Empleado)
    private empleadoRepository: Repository<Empleado>,
  ) {}

  async create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
    const existeEmpleado = await this.empleadoRepository.findOneBy({
      usuario: createEmpleadoDto.usuario,
    });

    if (existeEmpleado) {
      throw new ConflictException('El Empleado ya existe');
    }

    const empleado = new Empleado();
    empleado.usuario = createEmpleadoDto.usuario.trim();
    empleado.clave = process.env.DEFAULT_PASSWORD;
    empleado.nombre = createEmpleadoDto.nombre.trim();
    empleado.apellidos = createEmpleadoDto.apellidos.trim();
    empleado.email = createEmpleadoDto.email.trim();
    empleado.telefono = createEmpleadoDto.telefono.trim();
    empleado.direccion = createEmpleadoDto.direccion.trim();
    empleado.puesto = createEmpleadoDto.puesto.trim();

    const empleadoBd = await this.empleadoRepository.save(empleado);
    delete empleado.clave;
    return empleadoBd;
  }

  async findAll(): Promise<Empleado[]> {
    return this.empleadoRepository.find();
  }

  async findOne(id: number): Promise<Empleado> {
    const empleado = await this.empleadoRepository.findOneBy({ id });
    if (!empleado) {
      throw new NotFoundException(`No existe el Empleado ${id}`);
    }
    return empleado;
  }

  async update(
    id: number,
    updateEmpleadoDto: UpdateEmpleadoDto,
  ): Promise<Empleado> {
    const empleado = await this.empleadoRepository.findOneBy({ id });
    if (!empleado) {
      throw new NotFoundException(`No existe el Empleado ${id}`);
    }
    const empleadoUpdate = Object.assign(empleado, updateEmpleadoDto);
    return this.empleadoRepository.save(empleadoUpdate);
  }

  async remove(id: number) {
    const empleado = await this.empleadoRepository.findOneBy({ id });
    if (!empleado) {
      throw new NotFoundException(`No existe el Empleado ${id}`);
    }
    return this.empleadoRepository.delete(id);
  }

  async validate(usuario: string, clave: string): Promise<Empleado> {
    const usuarioOk = await this.empleadoRepository.findOne({
      where: { usuario },
      select: ['id', 'usuario', 'clave', 'nombre', 'apellidos', 'email'],
    });

    if (!usuarioOk) throw new NotFoundException('Usuario inexistente');

    if (!(await usuarioOk?.validatePassword(clave))) {
      throw new UnauthorizedException('Clave incorrecta');
    }

    delete usuarioOk.clave;
    return usuarioOk;
  }
}
