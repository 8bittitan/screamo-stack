import { faker } from '@faker-js/faker';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Nav from '~/components/Nav';

const history = createMemoryHistory();

export default {
  title: 'Components/Nav',
  component: Nav,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Nav>;

const Template: ComponentStory<typeof Nav> = (args) => (
  <Router location={history.location} navigator={history}>
    <Nav {...args} />
  </Router>
);

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {
    id: 'abc',
    email: faker.internet.email(),
    avatar: faker.internet.avatar(),
  },
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
