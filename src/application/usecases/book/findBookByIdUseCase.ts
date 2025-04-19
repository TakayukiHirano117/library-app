import { BookRepositoryInterface } from "../../../domain/repositories/bookRepositoryInterface";
import { FindBookByIdRequestDto } from "../../dtos/book/findBookByIdRequestDto";
import { FindBookByIdResponseDto } from "../../dtos/book/findBookByIdResponseDto";
import { findBookByIdUseCaseInterface } from "./findBookByIdUseCaseInterface";

export class FindBookByIdUseCase implements findBookByIdUseCaseInterface {
  constructor(private readonly bookRepository: BookRepositoryInterface) {}

  async execute(
    requestDto: FindBookByIdRequestDto
  ): Promise<FindBookByIdResponseDto | null> {
    const foundBook = await this.bookRepository.findById(requestDto.id);
    if (!foundBook) {
      return null;
    }

    return {
      id: foundBook.id,
      title: foundBook.title,
      isAvailable: foundBook.isAvailable,
      createdAt: foundBook.createdAt,
      updatedAt: foundBook.updatedAt,
    };
  }
}
