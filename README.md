# Remix Screamo Stack

![The Remix Screamo Stack](https://user-images.githubusercontent.com/33367713/173238887-19215227-1027-44f3-bf2d-3ff1306bfa81.png)

Learn more about [Remix Stacks](https://remix.run/stacks).

```
npx create-remix --template 8bittitan/screamo-stack
```

## What's in the stack

- [Railway app deployment](https://railway.app) with [Docker](https://www.docker.com/)
- [GitHub Actions](https://github.com/features/actions) for deploy on merge to production and staging environments
- Authentication handled with [Remix Auth](https://github.com/sergiodxa/remix-auth). (email/password and example OAuth)
- Database ORM with [Prisma](https://prisma.io)
- Styling with [Tailwind](https://tailwindcss.com/)
- Unit testing with [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)

Not a fan of bits of the stack? Fork it, change it, and use `npx create-remix --template your/repo`! Make it your own.

## Development

- Start the Postgres Database in [Docker](https://www.docker.com/get-started):

  ```sh
  npm run docker
  ```

  > **Note:** The npm script will complete while Docker sets up the container in the background. Ensure that Docker has finished and your container is running before proceeding.

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

This Remix Stack is built to be deployed with [Railway](https://railway.app).

Railway will automatically deploy a repository setup on Github. To get started, we first need to initialize a git repo:

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

Now that our code is pushed, we can start setting up Railway. We need to first create a new project from the dashboard (this is assuming you already have an account):

![Creating a new project](https://user-images.githubusercontent.com/33367713/173216800-81bebc6e-bbe6-4115-8a62-33a4d12b72e5.png)

Let's first setup the database, select `Provision PostgreSQL` from the menu. After a few moments, you should now see your new database!

![Newly created database](https://user-images.githubusercontent.com/33367713/173217025-3ae08ad7-1854-406a-a0c8-c0772eecebac.png)

Now that our database is setup, let's actually get Remix deploying! Click on `New` button in top right, or use the `CMD/CTRL + K` shortcut and select `New Service`. Then we want to select `GitHub Repo` and scroll down to fine the repo we created earlier.

We should now see both our database and our new service:

![Railway services](https://user-images.githubusercontent.com/33367713/173217096-bcd9b327-185b-4117-81ab-bd571f56eb98.png)

The only step left would be to add our `SESSION_SECRET` and any other needed ENV vars to our deploy. To do this we just need to click on our web service to get to the control panel. Then we click on `Variables` to add new ones:

![Railway Web Service variables](https://user-images.githubusercontent.com/33367713/173217137-c1b86133-ad32-4466-8475-e9f77b6290c8.png)

Luckily, Railway has a simple way of generating a secret string. We can use the `CMD/CTRL + K` keybind to open the command palette. From here type `secret` and select the `Generate 32 character Secret` which will copy a string to your clipboard.

![Railway Command Palette](https://user-images.githubusercontent.com/33367713/173217634-a15fd625-52ad-48d9-b412-79952c9a8386.png)

Then we just need to paste that secret in for the `SESSION_SECRET` variable, and remove the other variables. From there we can just click `Add all` to add our new secret.

![Railway Web Service new variables](https://user-images.githubusercontent.com/33367713/173217239-b1d05245-60a1-45d4-b27e-233b503ace10.png)

This will trigger a new deploy build in Railway and after the process is finished, we should be able to see our app running!

## Testing

### Vitest

For lower level tests of utilities and individual components, we use `vitest`. We have DOM-specific assertion helpers via [`@testing-library/jest-dom`](https://testing-library.com/jest-dom).

### Type Checking

This project uses TypeScript. It's recommended to get TypeScript set up for your editor to get a really great in-editor experience with type checking and auto-complete. To run type checking across the whole project, run `npm run typecheck`.

### Linting

This project uses ESLint for linting. That is configured in `.eslintrc.js`.

### Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project. It's recommended to install an editor plugin (like the [VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) to get auto-formatting on save. There's also a `npm run format` script you can run to format all files in the project.
