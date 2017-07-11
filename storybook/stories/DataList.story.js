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
      query DataListPeopleQuery($first: Int!) {
        allPeople(first: $first) @connection(key: "DataList_allPeople", filters: []) {
          edges {
            node {
              name
              gender
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
          label: 'Gender',
          property: 'gender',
        },
      ],
    }}
  />,
);

stories.add('with table render()', () =>
  <DataList
    environment={Environment}
    query={graphql`
      query DataListFilmsQuery($first: Int!) {
        allFilms(first: $first) @connection(key: "DataList_allFilms", filters: []) {
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

stories.add('with table cellRender()', () =>
  <DataList
    environment={Environment}
    query={graphql`
      query DataListVehiclesQuery($first: Int!) {
        allVehicles(first: $first) @connection(key: "DataList_allVehicles", filters: []) {
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

stories.add('with checkboxes', () =>
  <DataList
    environment={Environment}
    query={graphql`
      query DataListPlanetssQuery($first: Int!) {
        allPlanets(first: $first) @connection(key: "DataList_allPlanets", filters: []) {
          edges {
            node {
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
      checkboxes: {
        store: 'planets',
        component: () => <input type="checkbox" />
      },
    }}
  />,
);
