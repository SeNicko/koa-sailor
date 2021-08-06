import 'reflect-metadata';
import { createApp } from './app';
import Koa, { Context } from 'koa';
import { Controller } from '../decorators/controller';
import { Get } from '../decorators/route-mappings';

test('creates app properly', () => {
	@Controller({
		path: '/test'
	})
	class Test {
		@Get()
		async test(ctx: Context) {
			ctx.body = 'test';
		}
	}

	const app = createApp({
		controllers: [Test],
		middlewares: [() => {}]
	});

	expect(app.middleware).toHaveLength(2);
	expect((app.middleware[1] as any).router.stack).toHaveLength(1);
	expect(app).toBeInstanceOf(Koa);
});
