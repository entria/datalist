import React from 'react';
import { configure } from '@kadira/storybook';

function loadStories() {
  require('./stories/DataList.story');
  require('./stories/Table.story');
  require('./stories/Checkboxes.story');
}

configure(loadStories, module);
