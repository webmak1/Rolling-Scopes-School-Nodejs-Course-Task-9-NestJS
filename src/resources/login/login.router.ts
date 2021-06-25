import { Application, Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { loginService } from 'resources/login/login.service';
import express = require('express');

const router: Application = express();

router.route('/').post(async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;
    const token = await loginService.login(login, password);

    // @ts-ignore
    if (token.errorStatus) {
      // @ts-ignore
      return (
        res
          // @ts-ignore
          .status(token.errorStatus)
          // @ts-ignore
          .send(getReasonPhrase(token.errorStatus))
      );
    }

    return res.json({ token });
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
});

export { router };
