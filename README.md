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
            id
            name
            active
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  `}
  table={{
    columns: [
      {
        label: 'Name',
        property: 'name',
      },
      {
        label: 'Active',
        render: (user) => user.active ? 'Yes' : 'No',
      },
    ],
  }}
  checkboxes={{
    component: (props) => <input type="checkbox" {...props} />,
    onChange: (values) => console.log(values),
  }}
/>
```

### Props

- **environment**: The Relay Environment
- **query**: The Relay query
- **fragments**: An object with the query fragments
- **variables**: An object with the query default variables
- **table**: An object with table configs
- **checkboxes**: An object with checkboxes configs
