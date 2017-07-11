import React from 'react';
import { addDecorator, configure } from '@kadira/storybook';
import { Provider } from 'react-redux';
import store from './store';

addDecorator(story =>
  <Provider store={store}>
    {story()}
  </Provider>,
);

const req = require.context('./stories', true, /\.story\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
