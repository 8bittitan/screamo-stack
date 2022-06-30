import type { Widget } from '@prisma/client';
import type { LoaderFunction, ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';
import { requiresUser } from '~/http.server';

import { deleteWidget, widgetsForUser } from '~/models/widget.server';

type LoaderData = {
  widgets: Widget[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requiresUser(request);

  const widgets = await widgetsForUser(user.id);

  return json({
    widgets,
  });
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();

    const methodAction = formData.get('_action');

    if (methodAction !== 'delete') {
      throw new Error('Invalid action');
    }

    const widgetId = formData.get('widgetId')?.toString();

    if (!widgetId) {
      return json({ error: 'Cannot delete that Widget.' });
    }

    const user = await requiresUser(request);

    await deleteWidget(widgetId, user.id);

    return true;
  } catch (err) {
    console.error(err);
    return json({ error: 'Cannot delete that Widget.' });
  }
};

export default function DashboardIndex() {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <h2 className="text-xl font-bold mb-8">Widgets</h2>
      {data.widgets.length < 1 && (
        <p>
          You have no widgets yet! <Link to="/widgets/new">Click here</Link> to
          create one now!
        </p>
      )}
      <ul>
        {data.widgets.map((widget) => (
          <li key={widget.id} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{widget.title}</h3>
            <p>{widget.description}</p>
            <Link to={`/widgets/${widget.id}`} rel="prefetch">
              View
            </Link>

            <Form method="post">
              <input type="hidden" name="_action" value="delete" />
              <input type="hidden" name="widgetId" value={widget.id} />
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </Form>
          </li>
        ))}
      </ul>
    </div>
  );
}
