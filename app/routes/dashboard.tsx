import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { authenticator } from '~/utils/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  return json({ user });
};

export default function Dashboard() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
