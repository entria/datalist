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

  const arrayKeys = [];
  arrayKeys.push(Object.keys(queryProps)[0]);

  if (arrayKeys.indexOf('viewer') > -1) {
    arrayKeys.push(Object.keys(queryProps.viewer)[0]);
  }

  return arrayKeys.join('.');
}
