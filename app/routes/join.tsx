import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import Input from '~/components/Input';

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
      successRedirect: '/dashboard',
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
    <div className="flex min-h-full flex-col justify-center">
      <div className="mx-auto w-full max-w-md px-8 mt-8 mb-8">
        <Form action="/auth/github">
          <button
            type="submit"
            className="flex justify-center w-full py-4 bg-slate-700 hover:bg-slate-800 text-white rounded-md"
          >
            Sign in with Github
          </button>
        </Form>
      </div>

      <div className="mx-auto w-full max-w-md px-8 mb-8">
        <hr className="border-black" />
      </div>

      <div className="mx-auto w-full max-w-md px-8">
        <Form method="post" className="space-y-6" noValidate>
          {actionData?.error && <p>{actionData.error}</p>}
          <Input
            label="Email address"
            name="email"
            id="email"
            type="email"
            required
            // ref={emailRef}
            // error={actionData?.errors?.email}
            autoFocus={true}
          />

          <Input
            label="Password"
            name="password"
            id="password"
            type="password"
            required
            // ref={emailRef}
            // error={actionData?.errors?.password}
          />

          <button
            type="submit"
            className="w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Join
          </button>
        </Form>
      </div>
    </div>
  );
}
