import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateEmpleadoDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo usuario no de ser vacío' })
  @IsString({ message: 'El campo usuario debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo nombre no debe ser mayor a 100 caracteres',
  })
  readonly usuario: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre no de ser vacío' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo nombre no debe ser mayor a 100 caracteres',
  })
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo apellidos no de ser vacío' })
  @IsString({ message: 'El campo apellidos debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo apellidos no debe ser mayor a 100 caracteres',
  })
  readonly apellidos: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo email no de ser vacío' })
  @IsString({ message: 'El campo email debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo email no debe ser mayor a 100 caracteres',
  })
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo telefono no de ser vacío' })
  @IsString({ message: 'El campo telefono debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo telefono no debe ser mayor a 100 caracteres',
  })
  readonly telefono: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo dirección no de ser vacío' })
  @IsString({ message: 'El campo dirección debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo dirección no debe ser mayor a 100 caracteres',
  })
  readonly direccion: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo dirección no de ser vacío' })
  @IsString({ message: 'El campo dirección debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo dirección no debe ser mayor a 100 caracteres',
  })
  readonly puesto: string;
}
