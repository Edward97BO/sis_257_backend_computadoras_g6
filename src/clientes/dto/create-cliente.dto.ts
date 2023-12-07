import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo usuario no debe ser vacío' })
  @IsString({ message: 'El campo usuario debe ser de tipo cadena' })
  @MaxLength(20, {
    message: 'El campo usuario no debe ser mayor a 100 caracteres',
  })
  readonly usuario: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre no debe ser vacío' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo nombre no debe ser mayor a 100 caracteres',
  })
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo apellidos no debe ser vacío' })
  @IsString({ message: 'El campo apellidos debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo apellidos no debe ser mayor a 100 caracteres',
  })
  readonly apellidos: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo email no debe ser vacío' })
  @IsString({ message: 'El campo email debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo email no debe ser mayor a 100 caracteres',
  })
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo teléfono no debe ser vacío' })
  @IsString({ message: 'El campo teléfono debe ser de tipo cadena' })
  @MaxLength(200, {
    message: 'El campo teléfono no debe ser mayor a 15 caracteres',
  })
  readonly telefono: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo dirección no debe ser vacío' })
  @IsString({ message: 'El campo dirección debe ser de tipo cadena' })
  @MaxLength(200, {
    message: 'El campo dirección no debe ser mayor a 100 caracteres',
  })
  readonly direccion: string;
}
