// @flow
export const sanitizeVariables = (variables: Object): Object => ({ first: 20, ...variables });

export const isLoading = (props: any): boolean => props === null;
