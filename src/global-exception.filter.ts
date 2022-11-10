import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  HttpStatus,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === HttpStatus.UNAUTHORIZED) {
      throw new UnauthorizedException(error);
    }
    if (status === HttpStatus.NOT_FOUND) {
      throw new NotFoundException(error);
    }
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      const message = error.message;
      console.log(`${error.name} occured on ${Date.now()}`);
      console.log(error.message);
      console.log(error.stack);
      return response.status(status).send({
        status: status,
        error: message,
        trace: error.stack,
      });
    }
    if (status === HttpStatus.BAD_REQUEST) {
      console.log(error);
      return response.status(status).send({
        status: status,
        error: error.message,
        trace: error.stack,
      });
    }
  }
}
