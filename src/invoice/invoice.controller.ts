import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  // ─── POST ───────────────────────────────────────────────
  //Create a new invoice
  //http:localhost:3000/invoice
  //The JSON Body must be in the format of the CreateInvoiceDto
  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }

  // ─── GET ───────────────────────────────────────────────
  //Get all invoices
  //http:localhost:3000/invoice
  @Get()
  findAll() {
    return this.invoiceService.findAll();
  }

  // ─── GET ───────────────────────────────────────────────
  //Get invoice by id
  //http:localhost:3000/invoice/1
  //The param id is the id of the invoice, is required
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(+id);
  }

  // ─── PATCH ───────────────────────────────────────────────
  // Update invoice
  // http:localhost:3000/invoice/1
  // The param id is the id of the invoice, is required for update
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceService.update(+id, updateInvoiceDto);
  }

  // ─── DELETE ───────────────────────────────────────────────
  // Delete invoice
  // http:localhost:3000/invoice/1
  // The param id is the id of the invoice, is required for delete
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceService.remove(+id);
  }
}
