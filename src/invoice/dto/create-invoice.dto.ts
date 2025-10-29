import { IsDateString, IsNumber, IsString, IsOptional } from "class-validator";

// Create Invoice DTO
export class CreateInvoiceDto {
    @IsDateString()
    @IsOptional() // porque el valor se autogenera en la BD
    fecha?: Date;

    @IsNumber()
    total: number;

    @IsString()
    metodo_pago: string;

    @IsString()
    @IsOptional()
    estado_pago?: string;

    @IsNumber()
    id_paciente: number;

    @IsNumber()
    id_cita: number;
}
