import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError, z } from 'zod';

/**
 * Validate data with a schema.
 *
 * @param schema The schema to validate the data.
 * @returns A middleware function that validates the data.
 */
export const validateData = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map(({ path, message }) => ({
          message: `${path.join('.')} is ${message}`,
        }));

        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: 'Datos invalidos', details: errorMessages });

        return;
      }

      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Ha ocurrido un error' });
    }
  };
};
