import { BookService } from './businessLogic/bookService';
import { PrismaBookRepository } from './dataAccess/prismaBookRepository';
import { BookController } from './presentation/bookController';
import express from "express";

const app = express();

app.use(express.json());

const bookRepository = new PrismaBookRepository();
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

const PORT = process.env.PORT || 3000;

app.post('/books', bookController.add.bind(bookController));
app.get('/books/:id', bookController.findById.bind(bookController));

app.listen(PORT, () => console.log("Server is running on port " + PORT));
