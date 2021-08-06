import 'reflect-metadata';
import { Middleware } from 'koa';
import { Controller } from './controller';

describe('@Controller', () => {
	const metaMiddlewares: Middleware[] = [() => {}];
	const defaultMiddlewares: Middleware[] = [];
	const defaultRoutes: Middleware[] = [];
	const metaPath = '/test';
	const defaultPath = '/';

	test.each([
		[{}, defaultPath, defaultMiddlewares, defaultRoutes],
		[{ path: metaPath }, metaPath, defaultMiddlewares, defaultRoutes],
		[{ middlewares: metaMiddlewares }, defaultPath, metaMiddlewares, defaultRoutes],
		[{ path: metaPath, middlewares: metaMiddlewares }, metaPath, metaMiddlewares, defaultRoutes]
	])(
		'set valid meta with options %j',
		(options, expectedPath, expectedMiddlewares, expectedRoutes) => {
			@Controller(options)
			class Test {}

			const path: string = Reflect.getMetadata('path', Test);
			const middlewares: Middleware[] = Reflect.getMetadata('middlewares', Test);
			const routes: Middleware[] = Reflect.getMetadata('routes', Test);

			expect(path).toBe(expectedPath);
			expect(middlewares).toEqual(expectedMiddlewares);
			expect(routes).toEqual(expectedRoutes);
		}
	);
});
