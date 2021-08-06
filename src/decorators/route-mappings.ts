import { Middleware } from 'koa';

export type HttpMethod = 'all' | 'get' | 'post' | 'put' | 'patch' | 'delete';

interface DefinedRouteOptions {
  path?: string;
  middlewares?: Middleware[];
}

interface RouteOptions extends DefinedRouteOptions {
  method: HttpMethod;
}

export interface Route {
  path: string;
  method: HttpMethod;
  middlewares: Middleware[];
  handler: Middleware;
}

type RouteDecorator = (options: RouteOptions) => MethodDecorator;
type DefinedRouteDecorator = (options?: DefinedRouteOptions) => MethodDecorator;

export const Route: RouteDecorator = ({ path = '/', middlewares = [], method }) => {
  return (target, _propertyKey, descriptor: TypedPropertyDescriptor<any>) => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }

    const routes: Route[] = Reflect.getMetadata('routes', target.constructor);

    routes.push({
      path,
      method,
      middlewares,
      handler: descriptor.value
    });
  };
};

export const All: DefinedRouteDecorator = ({ path = '/', middlewares = [] } = {}) =>
  Route({ path, middlewares, method: 'all' });

export const Get: DefinedRouteDecorator = ({ path = '/', middlewares = [] } = {}) =>
  Route({ path, middlewares, method: 'get' });

export const Post: DefinedRouteDecorator = ({ path = '/', middlewares = [] } = {}) =>
  Route({ path, middlewares, method: 'post' });

export const Put: DefinedRouteDecorator = ({ path = '/', middlewares = [] } = {}) =>
  Route({ path, middlewares, method: 'put' });

export const Patch: DefinedRouteDecorator = ({ path = '/', middlewares = [] } = {}) =>
  Route({ path, middlewares, method: 'patch' });

export const Delete: DefinedRouteDecorator = ({ path = '/', middlewares = [] } = {}) =>
  Route({ path, middlewares, method: 'delete' });
