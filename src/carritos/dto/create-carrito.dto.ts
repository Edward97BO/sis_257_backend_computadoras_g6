import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateCarritoDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo codigo no debe ser vacío' })
  @IsString({ message: 'El campo codigo debe ser de tipo cadena' })
  @MaxLength(10, {
    message: 'El campo codigo no debe ser mayor a 100 caracteres',
  })
  readonly codigo: string;

  @ApiProperty()
  @IsNumber({}, { message: 'El campo cantidad debe ser de tipo numérico' })
  readonly cantidad: number;

  @ApiProperty()
  @IsNumber({}, { message: 'El campo cantidad debe ser de tipo numérico' })
  readonly precio: number;
}
