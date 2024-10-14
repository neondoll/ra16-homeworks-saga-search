export const searchSkills = async (search) => {
  const params = new URLSearchParams({ q: search });

  const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/search?" + params);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};
