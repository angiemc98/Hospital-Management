import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../person/person.entity';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Obtener los roles requeridos (definidos con @Roles)
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // Permitir si el endpoint no tiene restricciones de rol
    }

    // 2. Obtener el usuario (adjuntado por el JwtAuthGuard en req.user)
    const { user } = context.switchToHttp().getRequest();

    // 3. Verificar si el rol del usuario está en los roles requeridos
    // El rol del usuario es user.role (viene del payload del JWT)
    return requiredRoles.some((role) => user.role === role);
  }
}