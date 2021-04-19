export default async (url, options, { resolve, reject, atLast } = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const json = await response.json();
    if (resolve) resolve(json);
  } catch (err) {
    if (reject) reject(err.message);
  } finally {
    if (atLast) atLast();
  }
};
