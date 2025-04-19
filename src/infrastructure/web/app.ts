import { PrismaBookRepository } from '../../adapter/repositories/prismaBookRepository';
import express from "express";
import { PrismaClient } from '@prisma/client';
import { UuidGenerator } from '../../adapter/utils/uuidGenerator';
import { bookRoutes } from './routers/bookRouter';
import { AddBookUseCase } from '../../application/usecases/book/addBookUseCase';
import { BookController } from '../../adapter/controllers/bookController';
import { FindBookByIdUseCase } from '../../application/usecases/book/findBookByIdUseCase';

const app = express();

app.use(express.json());

const prisma = new PrismaClient()
const uuidGenerator = new UuidGenerator();

const bookRepository = new PrismaBookRepository(prisma);
const addBookUseCase = new AddBookUseCase(bookRepository, uuidGenerator);

const findBookByIdUseCase = new FindBookByIdUseCase(bookRepository);

const bookController = new BookController(addBookUseCase, findBookByIdUseCase);

app.use('/books', bookRoutes(bookController))

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => console.log("Server is running on port " + PORT));
