import type { FC } from 'react';
import type { UserSession } from '@types';

import { Form, Link } from '@remix-run/react';
import { useState } from 'react';

import Container from '~/components/Container';
import { Logo } from '~/components/Icons';

type Props = {
  user: UserSession;
};

const Nav: FC<Props> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-100" data-test="navigation">
      <Container classes="flex h-16 items-center">
        <Link to={user ? '/dashboard' : '/'}>
          <Logo />
        </Link>

        <nav className="ml-auto">
          {user ? (
            <div className="relative flex items-center">
              <Link to="/dashboard" className="mr-4">
                dashboard
              </Link>
              <button
                type="button"
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                id="user-menu-button"
                aria-expanded={isOpen ? 'true' : 'false'}
                aria-haspopup="true"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="sr-only">Open user menu</span>
                <span className="inline-flex pr-4 pl-2">{user.email}</span>
                {user.avatar && (
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.avatar}
                    alt=""
                  />
                )}
              </button>

              {isOpen && (
                <div
                  className="origin-top-right absolute right-0 top-8 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex={-1}
                >
                  <Form action="/auth/logout" role="menuitem" tabIndex={-1}>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 w-full text-left"
                      type="submit"
                    >
                      Logout
                    </button>
                  </Form>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/join" className="mr-4">
                Join
              </Link>
              <Link to="/login">Login</Link>
            </>
          )}
        </nav>
      </Container>
    </header>
  );
};

export default Nav;
