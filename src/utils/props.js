// @flow
export const sanitizeVariables = (variables: Object): Object => {
  return { first: 20, ...variables };
};

export const isLoading = (props: any): boolean => {
  return props === null;
};
