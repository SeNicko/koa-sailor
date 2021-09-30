# Koa sailor

`koa-sailor` is a simple and lightweight package for writing koa controllers faster.

---

If you encounter any errors or any inconsistencies in the docs please create an issue for them. They will be repaired ASAP 🐶

## Installation

with npm:

`npm i koa koa-sailor`

## Usage

Example app using `koa-sailor`.

```ts
import { Context } from 'koa';
import { createApp, Controller, Get, Delete } from 'koa-sailor';

@Controller({
  path: '/users'
})
class UsersController {
  @Get({
    path: '/:id'
  })
  async getUser(ctx: Context) {
    // ...
  }

  @Delete({
    path: '/:id',
    middlewares: [requireAuth]
  })
  async deleteUser(ctx: Context) {
    // ...
  }
}

const app = createApp({
  controllers: [new UsersController()]
});

app.listen(5000, () => {
  console.log('app listening on port 5000');
});
```

## Functionality

### `createApp`

- `controllers` - your controllers (`[]` by default)
- `middlewares` - app middlewares (`[]` by default)
- other options available in pure Koa

`createApp` is wrapper function for Koa app. It allows you to inject your controllers and middlewares into it (you can also set middlewares using koa's `.use()` if you prefer).

Example usage:

```ts
import { createApp } from 'koa-sailor';
import logger from 'koa-logger';
import UserController from './controllers/user';

const app = createApp({
  controllers: [new UserController()],
  middlewares: [logger]
});

app.use((ctx, next) => {
  console.log('Hello, fellas 🦥');
  next();
});

app.listen();
```

### `@Controller`

- `path` - controller path (`'/'` by default)
- `middlewares` - controller middlewares (`[]` by default)

Controller decorator allows to create a controller from existing class.

Example usage:

```ts
import { Controller } from 'koa-sailor';

@Controller({
  path: '/your/path',
  midlewares: [requireAuth]
})
class YourAmazingController {}
```

### `@All`, `@Get`, `@Post`, `@Put`, `@Patch`, and `@Delete`

Route decorators allows you to handle incoming requests

- `path` - controller path (`'/'` by default)
- `middlewares` - controller middlewares (`[]` by default)

Example usage:

```ts
import { Context } from 'koa';
import { Controller, Get } from 'koa-sailor';

@Controller({
  path: '/orders'
})
class YourController {
  @Get({
    // path is '/' by default!
    middlewares: [requireAuth]
  })
  async listOrders(ctx: Context) {
    // ...
  }
}
```

Thanks for reading!
