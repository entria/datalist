import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { graphql } from 'graphql';

import DataList from '../../src';
import Environment from '../relay/environment';

const stories = storiesOf('DataList', module);

stories.add('default', () =>
  <DataList
    environment={Environment}
    query={graphql`
      query DataListQuery($first: Int!) {
        adminUsers(first: $first) @connection(key: "DataList_adminUsers") {
          edges {
            node {
              name
              email
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      }
    `}
    variables={{ first: 5 }}
    columns={[
      {
        label: 'Name',
        property: 'name',
      },
      {
        label: 'Email',
        property: 'email',
      },
    ]}
  />,
);
