import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '../enums/user-roles.enum';
import ErrorMessage from '../enums/error-message.enum';
import { FlatUser } from 'src/users/user.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    this.logger.debug('Attempting to authorize user...');
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { user }: { user?: FlatUser } = context.switchToHttp().getRequest();
    if (user === undefined) {
      this.logger.warn('Could not authorize user. Not authenticated');
      throw new UnauthorizedException(ErrorMessage.NOT_AUTHENTICATED);
    }
    if (!requiredRoles.some((role) => user.roles?.includes(role))) {
      this.logger.warn('Could not authorize user. Insufficient permissions');
      throw new UnauthorizedException(ErrorMessage.INSUFFICIENT_PERMISSIONS);
    }
    return true;
  }
}
