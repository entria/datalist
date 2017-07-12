import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { graphql } from 'graphql';

import DataList from '../../src';
import Environment from '../relay/environment';

const stories = storiesOf('Table', module);

stories.add('with column render()', () =>
  <DataList
    environment={Environment}
    query={graphql`
      query TableFilmsQuery($first: Int!) {
        allFilms(first: $first) @connection(key: "Table_allFilms", filters: []) {
          edges {
            node {
              title
              director
              releaseDate
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
          label: 'Title',
          property: 'title',
        },
        {
          label: 'Director',
          property: 'director',
        },
        {
          label: 'Year',
          render: (film) => {
            const releaseDate = new Date(film.releaseDate);
            return releaseDate.getFullYear();
          },
        },
      ],
    }}
  />,
);

stories.add('with cellRender()', () =>
  <DataList
    environment={Environment}
    query={graphql`
      query TableVehiclesQuery($first: Int!) {
        allVehicles(first: $first) @connection(key: "Table_allVehicles", filters: []) {
          edges {
            node {
              name
              model
              vehicleClass
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
          label: 'Model',
          property: 'model',
        },
      ],
      cellRender: (children, vehicles) => (
        <div>
          {children}
          <small> ({vehicles.vehicleClass})</small>
        </div>
      )
    }}
  />,
);
