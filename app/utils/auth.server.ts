import { Authenticator } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import { GitHubStrategy } from 'remix-auth-github';
import type { UserSession } from '@types';

import { sessionStorage } from './session.server';
import { findByCredentials, findOrCreateByProfile } from '~/models/user.server';

const authenticator = new Authenticator<UserSession | null>(sessionStorage);

// If using the GitHub strategy, it is recommended to validate the ENV vars exist

// invariant(process.env.GITHUB_CLIENT_ID, 'GITHUB_CLIENT_ID must be set');
// invariant(process.env.GITHUB_CLIENT_SECRET, 'GITHUB_CLIENT_SECRET must be set');
// invariant(process.env.GITHUB_CALLBACK_URL, 'GITHUB_CALLBACK_URL must be set');

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get('email')?.toString();
    const password = form.get('password')?.toString();

    if (!email || !password) {
      return null;
    }

    const user = await findByCredentials(email, password);

    return user;
  }),
  'credentials',
);

// Example use of an OAuth strategy
authenticator.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
      callbackURL: process.env.GITHUB_CALLBACK_URL ?? '',
    },
    async ({ profile }) => {
      const user = await findOrCreateByProfile(profile);

      return user;
    },
  ),
);

export { authenticator };
