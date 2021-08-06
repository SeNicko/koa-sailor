import 'reflect-metadata';
import { Middleware } from 'koa';
import { Controller } from './controller';
import { Route, HttpMethod } from './route-mappings';

describe('@Route', () => {
	const defaultMiddlewares: Middleware[] = [];
	const metaMiddlewares = [() => {}];
	const defaultPath = '/';
	const metaPath = '/test';
	const routeMethod: HttpMethod = 'all';

	test.each([
		[{ method: routeMethod }, defaultPath, defaultMiddlewares],
		[{ path: metaPath, method: routeMethod }, metaPath, defaultMiddlewares],
		[{ middlewares: metaMiddlewares, method: routeMethod }, defaultPath, metaMiddlewares],
		[
			{ path: metaPath, middlewares: metaMiddlewares, method: routeMethod },
			metaPath,
			metaMiddlewares
		]
	])('set valid meta with options: %j', (options, expectedPath, expectedMiddlewares) => {
		@Controller()
		class Test {
			@Route(options)
			async test() {}
		}

		const routes: Route[] = Reflect.getMetadata('routes', Test);
		expect(routes).toHaveLength(1);

		const [{ path, middlewares, handler, method }] = routes;
		expect(path).toBe(expectedPath);
		expect(middlewares).toEqual(expectedMiddlewares);
		expect(handler).toBe(Test.prototype.test);
		expect(method).toBe(routeMethod);
	});
});
