# Remix Screamo Stack

![The Remix Screamo Stack](https://user-images.githubusercontent.com/33367713/173238887-19215227-1027-44f3-bf2d-3ff1306bfa81.png)

Learn more about [Remix Stacks](https://remix.run/stacks).

```
npx create-remix --template 8bittitan/screamo-stack
```

## What's in the stack

- [Vercel deployment](https://vercel.com)
- [GitHub Actions](https://github.com/features/actions) for deploy on merge to production and staging environments
- Authentication handled with [Remix Auth](https://github.com/sergiodxa/remix-auth). (email/password and example OAuth)
- Database ORM with [Prisma](https://prisma.io)
- [MySQL](https://www.mysql.com/) database to be used with [PlanetScale](https://planetscale.com/)
- Styling with [Tailwind](https://tailwindcss.com/)
- Unit testing with [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)
- [Storybook](https://storybook.js.org/) for component previewing
- Reliable integration tests with [Playwright](https://playwright.dev/)

Not a fan of bits of the stack? Fork it, change it, and use `npx create-remix --template your/repo`! Make it your own.

## Development

- Initial setup:

  ```sh
  npm run setup
  ```

- Run the first build:

  ```sh
  npm run build
  ```

- Start dev server:

  ```sh
  npm run dev
  ```

This starts your app in development mode, rebuilding assets on file changes.

The database seed script creates a new user with some data you can use to get started:

- Email: `testaccount123@test.com`
- Password: `password123`

### Relevant code:

This is a pretty simple note-taking app, but it's a good example of how you can build a full stack app with Prisma and Remix. The main functionality is creating users, logging in and out, and creating and deleting notes.

- creating users, and logging in and out [./app/models/user.server.ts](./app/models/user.server.ts)
- creating, and deleting widgets [./app/models/widget.server.ts](./app/models/widget.server.ts)
- user authentication [./app/utils/auth.server.ts](./app/utils/auth.server.ts)
- user sessions, and verifying them [./app/utils/session.server.ts](./app/utils/session.server.ts)

## Deployment

This Remix Stack is built to be deployed with [Vercel](https://vercel.com/).

Vercel will automatically deploy a repository setup on Github. To get started, we first need to initialize a git repo:

```sh
git init .
```

We also need to create a new [GitHub Repository](https://repo.new), and then add it as the remote for your project:

```sh
git remote add origin main
```

Once the repo is created, we need to create our first commit and push our changes:

```sh
git add .
```

```sh
git commit -m "Initial commit"
```

```sh
git push --set-upstream origin main
```

Now that our code is pushed, we can start setting up Vercel. We need to first create a new project from the dashboard (this is assuming you already have an account):

```
// TODO: Add documentation on creating a DB and Vercel app
```

## Testing

### Vitest

For lower level tests of utilities and individual components, we use `vitest`. We have DOM-specific assertion helpers via [`@testing-library/jest-dom`](https://testing-library.com/jest-dom).

### Playwright

For integration tests, we use [Playwright](https://playwright.dev/) and specifically tets on Chrome and FireFox.

### Type Checking

This project uses TypeScript. It's recommended to get TypeScript set up for your editor to get a really great in-editor experience with type checking and auto-complete. To run type checking across the whole project, run `npm run typecheck`.

### Linting

This project uses ESLint for linting. That is configured in `.eslintrc.js`.

### Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project. It's recommended to install an editor plugin (like the [VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) to get auto-formatting on save. There's also a `npm run format` script you can run to format all files in the project.

This will also auto format per commit through a husky commit hook!

### Storybook

We use [Storybook](https://storybook.js.org/) for component previewing. To get started, just run `npm run storybook` to start Storybook in local.

We also use the [a11y addon](https://storybook.js.org/addons/@storybook/addon-a11y/) for making sure that our components are accessible.
