import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Res() res: Response, @Body() loginDto: LoginDto) {
    try {
      const token = await this.loginService.login(loginDto);

      if (!token) {
        throw new Error('[App] Forbidden!');
      }

      return res.json({ token });
    } catch (err) {
      return res.status(HttpStatus.FORBIDDEN).send('[App] Forbidden!');
    }
  }
}
