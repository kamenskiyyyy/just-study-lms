import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ExpressRequest } from '../../types/expressRequest.interface';

@Injectable()
export class RoleAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<ExpressRequest>();

    if (!request.user) {
      throw new HttpException('Вы не авторизованы', HttpStatus.UNAUTHORIZED);
    }

    if (request.user.type === 'admin') {
      return true;
    }

    throw new HttpException(
      'Недостаточно прав для редактирования',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
