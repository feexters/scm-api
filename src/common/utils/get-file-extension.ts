export const getFileExtension = (fileName: string): string => {
  const ext = fileName.split('.').pop();

  if (!ext) {
    return;
  }

  return ext.toLowerCase();
};
