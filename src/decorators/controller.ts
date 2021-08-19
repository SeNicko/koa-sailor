import { Middleware } from 'koa';

export interface ControllerOptions {
  path?: string;
  middlewares?: Middleware[];
}

export const Controller = ({
  path = '',
  middlewares = []
}: ControllerOptions = {}): ClassDecorator => {
  return (target: Function) => {
    if (!Reflect.hasMetadata('routes', target)) {
      Reflect.defineMetadata('routes', [], target);
    }
    Reflect.defineMetadata('path', path === '/' ? '' : path, target);
    Reflect.defineMetadata('middlewares', middlewares, target);
  };
};
