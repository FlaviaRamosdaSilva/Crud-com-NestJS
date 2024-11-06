import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/dataBase/prisma.service';
import { BookDTO } from './modules.dto';

@Injectable()
export class ModulesService {
  constructor(private prisma: PrismaService) {}
  async create(data: BookDTO) {
    const bookExists = await this.prisma.book.findFirst({
      where: {
        bar_code: data.bar_code,
      },
    }); // aqui procuraos se existe um bar_code igual o que estou trazendo no data;

    if (bookExists) {
      throw new Error('Book already exists');
    } // se o resultado for true, ele retorna avisando que já tem um livro com esse bar_code;
    // se for false, ele continua para o próximo passo

    const book = await this.prisma.book.create({
      data,
    });

    return book; // aqui eu crio o book com os dados inseridos no "data" e retorno os dados do livro
  }

  async FindAll() {
    const books = await this.prisma.book.findMany();
    return books;
  }

  async update(id: string, data: BookDTO) {
    // alteração pelo ID
    const bookExists = await this.prisma.book.findUnique({
      where: {
        id,
      }, // aqui procuramos a chave unica, onde? ID.
    });

    if (!bookExists) {
      // se não existir  o ID dá mensagem de erro
      throw new Error('Book does not exist');
    }

    return await this.prisma.book.update({
      data,
      where: {
        //sempre usar o where pra dizer onde alterar, que é no id que passamos
        id,
      }, // aqui alteramos o livro com os dados do "data"
    });
  }

  async delete(id: string) {
    const bookExists = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!bookExists) {
      // se não existir  o ID dá mensagem de erro
      throw new Error('Book does not exist');
    }

    return await this.prisma.book.delete({
      where: {
        id,
      },
    }); // aqui exclui o livro com o id passado
  }
}
