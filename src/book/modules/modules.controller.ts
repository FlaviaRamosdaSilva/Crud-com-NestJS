import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookDTO } from './modules.dto';
import { ModulesService } from './modules.service';

@Controller('modules') // aqui mostra a rota que eu coloco no insomnia "/modules"
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  async create(@Body() data: BookDTO) {
    return await this.modulesService.create(data); // Como no Service eu já fiz a validação (se existe ou não) aqui eu só crio o book.
  } // preciso por o Return no inicio para dar a resposta no Insomnia

  @Get()
  async findAll() {
    // GET não precisa de nenhum parametro
    return await this.modulesService.FindAll(); // Retornar todos os livros, listar.
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: BookDTO) {
    // PUT precisa do id do livro que ta no Params
    return await this.modulesService.update(id, data); // Atualizar um livro, atualizar dados.
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    // DELETE precisa do id do livro que ta no Params
    return await this.modulesService.delete(id); // Deletar um livro, excluir dados.
  }
}
