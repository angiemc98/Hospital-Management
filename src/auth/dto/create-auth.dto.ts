import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
    @ApiProperty({
        description: 'Example property',
        example: 'example',
    })
    example: string;
}