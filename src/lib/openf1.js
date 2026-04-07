const ERGAST_BASE = 'https://ergast.com/api/f1';
const OPENF1_BASE = 'https://api.openf1.org/v1';

/**
 * Internal fetch helper — returns parsed JSON or null on failure.
 * @param {string} url
 * @returns {Promise<any|null>}
 */
async function safeFetch(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`[openf1] HTTP ${response.status} fetching ${url}`);
      return null;
    }
    return await response.json();
  } catch (err) {
    console.error(`[openf1] Fetch error for ${url}:`, err);
    return null;
  }
}

/**
 * Fetches the next race in the current F1 season from the Ergast API.
 * @returns {Promise<Object|null>} Race object or null on error.
 */
export async function getNextRace() {
  const data = await safeFetch(`${ERGAST_BASE}/current/next.json`);
  try {
    return data?.MRData?.RaceTable?.Races?.[0] ?? null;
  } catch {
    return null;
  }
}

/**
 * Fetches the current driver standings from the Ergast API.
 * @returns {Promise<Array|null>} Array of DriverStanding objects or null on error.
 */
export async function getDriverStandings() {
  const data = await safeFetch(`${ERGAST_BASE}/current/driverStandings.json`);
  try {
    return (
      data?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings ?? null
    );
  } catch {
    return null;
  }
}

/**
 * Fetches the results of the most recent race in the current season.
 * @returns {Promise<Array|null>} Array of Result objects or null on error.
 */
export async function getLastRaceResult() {
  const data = await safeFetch(`${ERGAST_BASE}/current/last/results.json`);
  try {
    return data?.MRData?.RaceTable?.Races?.[0]?.Results ?? null;
  } catch {
    return null;
  }
}

/**
 * Fetches the latest session data from the OpenF1 API.
 * @returns {Promise<Object|null>} Session object or null on error.
 */
export async function getLiveSessionData() {
  const data = await safeFetch(`${OPENF1_BASE}/sessions?session_key=latest`);
  try {
    // OpenF1 returns an array; return the first (latest) session
    if (Array.isArray(data)) {
      return data[0] ?? null;
    }
    return data ?? null;
  } catch {
    return null;
  }
}
