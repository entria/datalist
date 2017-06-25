# DataList

## Install

```
npm i @entria/datalist --save
yarn add @entria/datalist
```

## Usage

```js
<DataList
  environment={Environment}
  query={graphql`
    query DataListQuery($first: Int!) {
      users(first: $first) @connection(key: "DataList_users") {
        edges {
          node {
            name
            email
            active
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  `}
  columns={[
    {
      label: 'Name',
      property: 'name',
    },
    {
      label: 'Email',
      property: 'email',
    },
    {
      label: 'Active',
      render: (user) => user.active ? 'Yes' : 'No',
    },
  ]}
/>
```

### Props

- **environment**: The Relay Environment
- **query**: The Relay query
- **fragments**: An object with the query fragments
- **variables**: An object with the query default variables
- **columns**: An array with the table columns
