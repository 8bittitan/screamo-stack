import type { ActionFunction } from '@remix-run/node';
import type { CreateWidgetParams } from '~/schemas/widget.server';

import { json, redirect } from '@remix-run/node';
import { requiresUser } from '~/http.server';
import { createWidget } from '~/models/widget.server';
import { Form } from '@remix-run/react';
import Input from '~/components/Input';

export const action: ActionFunction = async ({ request }) => {
  const user = await requiresUser(request);

  try {
    const formData = await request.formData();

    const widgetData = Object.fromEntries(formData) as CreateWidgetParams;

    const widget = await createWidget({ ...widgetData, userId: user.id });

    if (!widget.id) {
      return json({ error: 'Could not create widget' });
    }

    return redirect(`/widgets/${widget.id}`);
  } catch (err) {
    console.error(err);
    return json({ error: 'Something went wrong' });
  }
};

export default function WidgetsNew() {
  return (
    <div>
      <Form
        method="post"
        className="mx-auto max-w-2xl pt-8 flex flex-col space-y-6"
      >
        <h3 className="font-semibold text-xl">Create a new Widget</h3>
        <Input type="text" name="title" label="Widget Title" required={true} />
        <Input
          type="text"
          name="description"
          label="Widget Description"
          required={true}
        />

        <button
          type="submit"
          className="w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Create Widget
        </button>
      </Form>
    </div>
  );
}
