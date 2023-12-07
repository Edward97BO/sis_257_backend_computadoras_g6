import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber } from 'class-validator';

export class CreateCompraDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo idProducto debe estar definido' })
  @IsNumber({}, { message: 'El campo idProducto debe ser de tipo numérico' })
  readonly idProducto: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo idCarrito debe estar definido' })
  @IsNumber({}, { message: 'El campo idCarrito debe ser de tipo numérico' })
  readonly idCarrito: number;
}
