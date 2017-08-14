import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { graphql } from 'graphql';

import DataList from '../../src';
import Environment from '../relay/environment';

const stories = storiesOf('Checkboxes', module);

stories.add('default', () =>
  <DataList
    list="allPlanets"
    environment={Environment}
    query={graphql`
      query CheckboxesPlanetssQuery($first: Int!) {
        allPlanets(first: $first) @connection(key: "Checkboxes_allPlanets", filters: []) {
          edges {
            node {
              id
              name
              population
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      }
    `}
    variables={{ first: 5 }}
    table={{
      columns: [
        {
          label: 'Name',
          property: 'name',
        },
        {
          label: 'Population',
          property: 'population',
        },
      ],
    }}
    checkboxes={{
      component: (props) => <input type="checkbox" {...props} />,
      onChange: (values) => alert(values.map(value => value.name).join(', ')),
    }}
  />,
);


stories.add('with checked default', () =>
  <DataList
    list="allPlanets"
    environment={Environment}
    query={graphql`
      query CheckboxesPlanetssQuery($first: Int!) {
        allPlanets(first: $first) @connection(key: "Checkboxes_allPlanets", filters: []) {
          edges {
            node {
              id
              name
              population
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      }
    `}
    variables={{ first: 5 }}
    table={{
      columns: [
        {
          label: 'Name',
          property: 'name',
        },
        {
          label: 'Population',
          property: 'population',
        },
      ],
    }}
    checkboxes={{
      component: (props) => <input type="checkbox" {...props} />,
      onChange: (values) => alert(values.map(value => value.name).join(', ')),
      checked: [
        {
          id: 'cGxhbmV0czoy',
          name: 'Alderaan',
          population: 2000000000,
        },
        {
          id: 'cGxhbmV0czoz',
          name: 'Yavin IV',
          population: 1000,
        },
        {
          id: 'cGxhbmV0czo4',
          name: 'Naboo',
          population: 4500000000,
        },
        {
          id: 'cGxhbmV0czoxMA==',
          name: 'Kamino',
          population: 1000000000,
        },
      ]
    }}
  />,
);
