import Koa from 'koa';
import Router from '@koa/router';
import { Middleware } from 'koa';
import { Route } from '../decorators/route-mappings';

export interface AppOptions {
  middlewares?: Middleware[];
  controllers?: any[];
  env?: string | undefined;
  keys?: string[] | undefined;
  proxy?: boolean | undefined;
  subdomainOffset?: number | undefined;
  proxyIpHeader?: string | undefined;
  maxIpsCount?: number | undefined;
}

export const createApp = ({ controllers = [], middlewares = [], ...options }: AppOptions = {}) => {
  const app = new Koa(options);

  middlewares.forEach(middleware => app.use(middleware));

  controllers.forEach(controller => {
    const controllerPath: string = Reflect.getMetadata('path', controller);
    const controllerMiddlewares: Middleware[] = Reflect.getMetadata('middlewares', controller);
    const controllerRoutes: Route[] = Reflect.getMetadata('routes', controller);

    const router = new Router({
      prefix: controllerPath
    });

    router.use(...controllerMiddlewares);

    controllerRoutes.forEach(({ path, method, handler, middlewares }) => {
      router[method](path, ...middlewares, handler);
    });

    app.use(router.routes());
  });

  return app;
};
