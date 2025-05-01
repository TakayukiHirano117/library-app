import { PrismaBookRepository } from '../../adapter/repositories/prismaBookRepository';
import express from "express";
import { PrismaClient } from '@prisma/client';
import { UuidGenerator } from '../../adapter/utils/uuidGenerator';
import { bookRoutes } from './routers/bookRouter';
import { AddBookUseCase } from '../../application/usecases/book/addBookUseCase';
import { BookController } from '../../adapter/controllers/bookController';
import { FindBookByIdUseCase } from '../../application/usecases/book/findBookByIdUseCase';
import { PrismaUserRepository } from '../../adapter/repositories/prismaUserRepository';
import { CreateUserUseCase } from '../../application/usecases/user/createUserUseCase';
import { UserController } from '../../adapter/controllers/userController';
import { userRoutes } from './routers/userRouter';

const app = express();

app.use(express.json());

const prisma = new PrismaClient()
const uuidGenerator = new UuidGenerator();

const bookRepository = new PrismaBookRepository(prisma);
const addBookUseCase = new AddBookUseCase(bookRepository, uuidGenerator);

const findBookByIdUseCase = new FindBookByIdUseCase(bookRepository);

const bookController = new BookController(addBookUseCase, findBookByIdUseCase);

const userRepository = new PrismaUserRepository(prisma);
const createUserUseCase = new CreateUserUseCase(userRepository, uuidGenerator);
const userController = new UserController(createUserUseCase);

app.use('/books', bookRoutes(bookController))
app.use('/users', userRoutes(userController));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Server is running on port " + PORT));
