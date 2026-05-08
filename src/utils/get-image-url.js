export const getImageUrl = (mainPath, imageName, extension) => {
  return new URL(`${mainPath}/${imageName}.${extension}`, import.meta.url).href;
}
