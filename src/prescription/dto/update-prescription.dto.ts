import { PartialType } from '@nestjs/swagger';
import { CreatePrescriptionDto } from './create-prescription.dto';

<<<<<<< HEAD
export class UpdatePrescriptionDto extends PartialType(CreatePrescriptionDto) {}
=======
// Update Prescription DTO
export class UpdatePrescriptionDto extends PartialType(CreatePrescriptionDto) {
    
    @IsString()
    observations: string;

    @IsInt()
    quantity: number;

    @IsInt()
    duration: number;

    @IsInt()
    appointmentId: number;


}
>>>>>>> b846244bf0d6c0ce173c5869f275c3ec233c969f
