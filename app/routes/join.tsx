import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';

import { createUser } from '~/models/user.server';
import { authenticator } from '~/utils/auth.server';

type ActionData = {
  error: string;
};

export const action: ActionFunction = async ({ request, context }) => {
  const req = Object.assign({}, request);
  const form = await request.formData();

  const email = form.get('email')?.toString();
  const password = form.get('password')?.toString();

  if (!email || !password) {
    return json<ActionData>({
      error: 'Missing email or password',
    });
  }

  try {
    await createUser(email, password);

    const res = await authenticator.authenticate('credentials', req, {
      context,
      throwOnError: true,
      successRedirect: '/sites',
    });

    return res;
  } catch (err) {
    const error = err as Error;
    return json<ActionData>({
      error: error.message,
    });
  }
};

export default function Join() {
  const actionData = useActionData<ActionData>() as ActionData;

  return (
    <div>
      <h2>Join Widgets today!</h2>
      {actionData?.error && <p>{actionData.error}</p>}
      <Form method="post">
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input type="email" name="email" id="email" required />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input type="password" name="password" id="password" required />
        </div>

        <br />

        <button type="submit">Join</button>
      </Form>

      <br />

      <Form action="/auth/github">
        <button type="submit">Join with Github</button>
      </Form>
    </div>
  );
}
