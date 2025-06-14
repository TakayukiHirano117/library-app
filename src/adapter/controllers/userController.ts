import { Request, Response } from "express";
import { CreateUserUseCaseInterface } from "../../application/usecases/user/createUserUseCaseInterface";
import { CreateUserRequestDto } from "../../application/dtos/user/createUserRequestDto";

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCaseInterface
  ) // Add other useCase propaties as needed
  {}

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const requestDto: CreateUserRequestDto = {
        email: req.body.email,
      };
      const user = await this.createUserUseCase.execute(requestDto);

      // Add response status code
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "ユーザーの作成に失敗しました" });
    }
  }
}
