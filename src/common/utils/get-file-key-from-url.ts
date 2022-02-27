export const getFileKeyFromUrl = (url: string): string => {
  const retrieveFileKeyFromUrlRegexp = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)|((\/{1,})?\?.*)$/g;

  return url.replace(retrieveFileKeyFromUrlRegexp, '');
};
