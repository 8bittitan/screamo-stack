import { Authenticator } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import { GitHubStrategy } from 'remix-auth-github';
import invariant from 'tiny-invariant';
import type { UserSession } from '@types';

import { sessionStorage } from './session.server';
import { findByCredentials, findOrCreateByProfile } from '~/models/user.server';

const authenticator = new Authenticator<UserSession | null>(sessionStorage);

invariant(process.env.GITHUB_CLIENT_ID, 'GITHUB_CLIENT_ID must be set');
invariant(process.env.GITHUB_CLIENT_SECRET, 'GITHUB_CLIENT_SECRET must be set');
invariant(process.env.GITHUB_CALLBACK_URL, 'GITHUB_CALLBACK_URL must be set');

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get('email')?.toString();
    const password = form.get('password')?.toString();

    // TODO: Use Zod
    if (!email || !password) {
      return null;
    }

    const user = await findByCredentials(email, password);

    return user;
  }),
  'credentials',
);

authenticator.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async ({ profile }) => {
      const user = await findOrCreateByProfile(profile);

      return user;
    },
  ),
);

export { authenticator };
