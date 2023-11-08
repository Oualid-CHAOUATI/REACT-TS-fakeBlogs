export const get = async (url: string) => {
  // throw new Error("haha error");
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("unseccesful request !");
  }
  const data = (await response.json()) as unknown;
  return data;
};
