import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

import { requiresUser } from '~/http.server';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requiresUser(request);

  return json({ user });
};

export default function Dashboard() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
