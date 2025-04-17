import { Book } from "@prisma/client";
import { BookRepositoryInterface } from "../domain/repositories/bookRepositoryInterface";
import { BookServiceInterface } from "./bookServiceInterface";

export class BookService implements BookServiceInterface {
  constructor(private readonly bookRepository: BookRepositoryInterface) {}

  async add(title: string): Promise<Book> {
    return await this.bookRepository.create(title);
  }

  async findById(id: string): Promise<Book | null> {
    return await this.bookRepository.findById(id);
  }
}
