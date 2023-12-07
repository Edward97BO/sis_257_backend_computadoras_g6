import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductoDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre no de ser vacío' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo nombre no debe ser mayor a 100 caracteres',
  })
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo descripción no de ser vacío' })
  @IsString({ message: 'El campo descripción debe ser de tipo cadena' })
  @MaxLength(300, {
    message: 'El campo descripción no debe ser mayor a 300 caracteres',
  })
  readonly descripcion: string;

  @ApiProperty()
  @IsNumber({}, { message: 'El campo precio debe ser de tipo numérico' })
  readonly precio: number;

  @ApiProperty()
  @IsNumber({}, { message: 'El campo stock debe ser de tipo numérico' })
  readonly stock: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo url no debe ser vacío' })
  @IsString({ message: 'El campo url debe ser de tipo cadena' })
  @MaxLength(300, {
    message: 'El campo url no debe ser mayor a 300 caracteres',
  })
  readonly url: string;

  @ApiProperty()
  @IsDefined({ message: 'El campo idCategoria debe estar definido' })
  @IsNumber({}, { message: 'El campo idCategoria debe ser de tipo numerico' })
  readonly idCategoria: number;
}
