export const parsedHeight = (height: number) => {
  if (height < 10) {
    const cm = height * 10;
    return { measure: 'cm', converted: cm };
  }

  const meters = (height * 10) / 100;
  return { measure: 'm', converted: meters };
};
