// @flow
export const sanitizeVariables = (variables: Object): Object => {
  const sanitized = { ...variables };
  if (!sanitized.first) {
    sanitized.first = 20;
  }

  return sanitized;
};

export const isLoading = (props: any): boolean => {
  return props === null;
};
