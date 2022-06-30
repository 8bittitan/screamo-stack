import type { Widget } from '@prisma/client';
import type { LoaderFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { requiresUser } from '~/http.server';

import { getWidgetForUser } from '~/models/widget.server';

type LoaderData = {
  widget: Widget;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requiresUser(request);

  const widgetId = params.id as string;

  const widget = await getWidgetForUser(widgetId, user.id);

  if (!widget) {
    return redirect('/dashboard');
  }

  return json({
    widget,
  });
};

export default function DashboardIndex() {
  const { widget } = useLoaderData<LoaderData>();

  return (
    <div>
      <h2 className="text-xl font-bold mb-8">{widget.title}</h2>
      <p>{widget.description}</p>
    </div>
  );
}
