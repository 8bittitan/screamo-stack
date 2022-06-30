import type { ActionFunction, MetaFunction } from '@remix-run/node';
import { Form, Link, useActionData } from '@remix-run/react';
import React from 'react';
import Input from '~/components/Input';

import { authenticator } from '~/utils/auth.server';

export const meta: MetaFunction = () => {
  return {
    title: 'Login',
  };
};

type ActionData = {
  errors?: {
    email?: string;
    password?: string;
  };
};

export const action: ActionFunction = async ({ request, context }) => {
  await authenticator.authenticate('credentials', request, {
    context,
    successRedirect: '/dashboard',
    throwOnError: true,
    failureRedirect: '/login',
  });
};

export default function Login() {
  const actionData = useActionData() as ActionData;
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

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
          <Input
            label="Email address"
            name="email"
            id="email"
            type="email"
            required
            ref={emailRef}
            error={actionData?.errors?.email}
            autoFocus={true}
          />

          <Input
            label="Password"
            name="password"
            id="password"
            type="password"
            required
            ref={emailRef}
            error={actionData?.errors?.password}
          />

          <button
            type="submit"
            className="w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Log in
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <div className="text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link className="text-blue-500 underline" to="/join">
                Sign up
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
