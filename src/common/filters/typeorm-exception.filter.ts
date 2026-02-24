import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const error = exception as any;
    const message = error.message;
    const detail = error.detail;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorMessage = 'Internal server error';

    // PostgreSQL unique violation error code
    if (error.code === '23505') {
      status = HttpStatus.CONFLICT;
      errorMessage = detail || 'Record already exists';
    }

    response.status(status).json({
      statusCode: status,
      message: errorMessage,
      error: 'Conflict',
      timestamp: new Date().toISOString(),
    });
  }
}
