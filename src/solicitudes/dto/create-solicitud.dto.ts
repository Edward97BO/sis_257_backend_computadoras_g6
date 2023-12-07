import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateSolicitudDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo Pedido debe estar definido' })
  @IsNumber({}, { message: 'El campo Pedido debe ser de tipo numérico' })
  readonly idPedido: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo Producto debe estar definido' })
  @IsNumber({}, { message: 'El campo Producto debe ser de tipo numérico' })
  readonly idProducto: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo Código no debe ser vacío' })
  @IsString({ message: 'El campo Código debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo Código no debe ser mayor a 100 caracteres',
  })
  readonly codigo: string;

  @ApiProperty()
  @IsDefined({ message: 'El campo cantidad debe estar definido' })
  @IsNumber({}, { message: 'El campo cantidad debe ser de tipo numérico' })
  readonly cantidad: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo precio debe estar definido' })
  @IsNumber({}, { message: 'El campo precio debe ser de tipo numérico' })
  readonly precio: number;
}
