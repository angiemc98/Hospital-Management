import { IsDateString, IsNumber, IsString, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateInvoiceDto {
    @ApiProperty({
        description: 'The date of the invoice',
        example: '2024-07-20T10:00:00Z',
        required: false,
    })
    @IsDateString()
    @IsOptional()
    fecha?: Date;

    @ApiProperty({
        description: 'The total amount of the invoice',
        example: 150.75,
    })
    @IsNumber()
    total: number;

    @ApiProperty({
        description: 'The payment method',
        example: 'Credit Card',
    })
    @IsString()
    metodo_pago: string;

    @ApiProperty({
        description: 'The payment status',
        example: 'Paid',
        required: false,
    })
    @IsString()
    @IsOptional()
    estado_pago?: string;

    @ApiProperty({
        description: 'The ID of the patient',
        example: 1,
    })
    @IsNumber()
    id_paciente: number;

    @ApiProperty({
        description: 'The ID of the appointment',
        example: 1,
    })
    @IsNumber()
    id_cita: number;
}