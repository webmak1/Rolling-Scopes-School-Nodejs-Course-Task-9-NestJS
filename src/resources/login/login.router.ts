import { Application, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { loginService } from 'resources/login/login.service';
import express = require('express');

const router: Application = express();

router.route('/').post(async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;
    const token = await loginService.login(login, password);

    if (!token) {
      throw new Error('[App] Forbidden!');
    }

    return res.json({ token });
  } catch (err) {
    return res.status(StatusCodes.FORBIDDEN).send('[App] Forbidden!');
  }
});

export { router };
