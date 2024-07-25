const apiUrl = 'https://localhost:8000/api';

/**
 *
 * @param {string} route
 * @param {object} options
 * @returns {Promise}
 */
export async function fetchData({ route, options = {} }) {
  const headers = { Accept: 'application/json', ...options.headers };
  const result = await fetch(`${apiUrl}${route}`, { ...options, headers });
  if (result.ok) {
    return result.json();
  }
  throw new Error('Erreur serveur', { cause: result });
}
