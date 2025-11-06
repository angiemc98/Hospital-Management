import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString } from "class-validator";

export class CreateAppointmentDto {

    @ApiProperty({
        description: 'Date of the appointment',
        example: '2024-01-01T12:00:00.000Z',
    })
    @IsDateString()
    date: Date;

    @ApiProperty({
        description: 'Reason of the appointment',
        example: 'Headache',
        required: false,
    })
    @IsString()
    @IsOptional()
    reason?: string;

    @ApiProperty({
        description: 'Notes of the appointment',
        example: 'The patient has been feeling sick for 2 days',
        required: false,
    })
    @IsString()
    @IsOptional()
    notes?: string;

    @ApiProperty({
        description: 'Status of the appointment (scheduled, completed, canceled)',
        example: 'scheduled',
        required: false,
    })
    @IsString()
    @IsOptional()
    status?: string;

    @ApiProperty({
        description: 'Doctor id',
        example: 1,
    })
    @IsInt()
    doctorId: number;

    @ApiProperty({
        description: 'Patient id',
        example: 1,
    })
    @IsInt()
    patientId: number;
    
    @ApiProperty({
        description: 'Office id',
        example: 1,
    })
    @IsInt()
    officeId: number;
    
}