import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Input from '~/components/Input';

export default {
  title: 'Components/Input',
  component: Input,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Base = Template.bind({});
Base.args = {
  label: 'Title',
  name: 'title',
};

export const WithError = Template.bind({});
WithError.args = {
  label: 'Title',
  name: 'title',
  error: 'This field is required',
};
