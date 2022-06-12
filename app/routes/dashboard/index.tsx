import type { Widget } from '@prisma/client';
import type { LoaderFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { widgetsForUser } from '~/models/widget.server';
import { authenticator } from '~/utils/auth.server';

type LoaderData = {
  widgets: Widget[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    return redirect('/login');
  }

  const widgets = await widgetsForUser(user.id);

  return json({
    widgets,
  });
};

export default function DashboardIndex() {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <h2 className="text-xl font-bold mb-8">Widgets</h2>
      <ul>
        {data.widgets.map((widget) => (
          <li key={widget.id} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{widget.title}</h3>
            <p>{widget.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
