import get from 'lodash/get';

function getData(queryProps, dataKey) {
  if (!queryProps) {
    return {
      edges: [],
      pageInfo: {
        hasNextPage: false,
      },
    };
  }

  return get(queryProps, dataKey);
}

export function hasNextPage(queryProps, dataKey) {
  const data = getData(queryProps, dataKey);
  return typeof data.pageInfo !== typeof undefined && data.pageInfo.hasNextPage;
}

export function createDataArray(queryProps, dataKey) {
  const data = getData(queryProps, dataKey);
  if (!data) {
    return [];
  }

  return data.edges.map(info => info.node);
}

export function identifyDataKey(queryProps) {
  if (!queryProps) {
    return null;
  }

  const walkPropsKeys = props => {
    const key = Object.keys(props)[0];
    const arrayKeys = [key];
    const newProps = props[key];

    if (!newProps.edges) {
      return arrayKeys.concat(walkPropsKeys(newProps));
    }

    return arrayKeys;
  };

  return walkPropsKeys(queryProps).join('.');
}
