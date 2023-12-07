import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre no debe ser vacío' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo nombre no debe ser mayor a 100 caracteres',
  })
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo descripción no debe ser vacío' })
  @IsString({ message: 'El campo descripción debe ser de tipo cadena' })
  @MaxLength(300, {
    message: 'El campo descripción no debe ser mayor a 300 caracteres',
  })
  readonly descripcion: string;
}
