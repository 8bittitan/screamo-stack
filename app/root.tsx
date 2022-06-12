import type {
  MetaFunction,
  LoaderFunction,
  LinksFunction,
} from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { json } from '@remix-run/node';

import { authenticator } from './utils/auth.server';

import tailwindStyles from './styles/tailwind.css';

import Container from '~/components/Container';
import Nav from '~/components/Nav';

export const links: LinksFunction = () => [
  { href: tailwindStyles, rel: 'stylesheet' },
];

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Screamo Stack',
  viewport: 'width=device-width,initial-scale=1',
});

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);

  return json({ user });
};

export default function App() {
  const { user } = useLoaderData();

  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Nav user={user} />
        <Container classes="mt-4">
          <Outlet />
        </Container>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
