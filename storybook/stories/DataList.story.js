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

stories.add('with custom render function', () =>
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
        }
      ],
    }}
  />,
);
