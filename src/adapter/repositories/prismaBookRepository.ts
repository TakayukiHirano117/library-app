import { PrismaClient } from "@prisma/client";
import { Book } from "../../domain/entities/book";
import { BookRepositoryInterface } from "../../domain/repositories/bookRepositoryInterface";
import { TransactionContextInterface } from "../../domain/utils/transactionContextInterface";
export class PrismaBookRepository implements BookRepositoryInterface {
  constructor(private readonly prisma: PrismaClient) {}

  async create(book: Book, ctx?: TransactionContextInterface): Promise<Book> {
    const prisma = ctx ? (ctx as PrismaClient) : this.prisma;
    const createdBook = await prisma.book.create({
      data: {
        id: book.id,
        title: book.title,
        isAvailable: book.isAvailable,
        createdAt: book.createdAt,
        updatedAt: book.updatedAt,
      },
    });

    return new Book(
      createdBook.id,
      createdBook.title,
      createdBook.isAvailable,
      createdBook.createdAt,
      createdBook.updatedAt
    );
  }

  async findById(id: string, ctx?: TransactionContextInterface): Promise<Book | null> {
    const prisma = ctx ? (ctx as PrismaClient) : this.prisma;
    const foundBook = await prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!foundBook) {
      return null;
    }

    return new Book(
      foundBook.id,
      foundBook.title,
      foundBook.isAvailable,
      foundBook.createdAt,
      foundBook.updatedAt
    );
  }

  async update(book: Book, ctx?: TransactionContextInterface): Promise<Book> {
    const prisma = ctx ? (ctx as PrismaClient) : this.prisma;
    const updatedBook = await prisma.book.update({
      where: { id: book.id },
      data: { isAvailable: book.isAvailable },
    });

    return new Book(
      updatedBook.id,
      updatedBook.title,
      updatedBook.isAvailable,
      updatedBook.createdAt,
      updatedBook.updatedAt
    );
  }
}
