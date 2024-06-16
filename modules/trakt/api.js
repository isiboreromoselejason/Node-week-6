const trakt = "https://api.trakt.tv"; // base URL for any Trakt API requests

async function getTrendingMovies() {
  let reqUrl = `${trakt}/movies/trending`;
  console.log(reqUrl);
  var response = await fetch(
    reqUrl,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": 2,
        "trakt-api-key": process.env.TRAKT_CLIENT_ID
      }
    }
  );
  return await response.json();
}

async function getRelatedMovies(imdbId) {
  let reqUrl = `${trakt}/movies/${imdbId}/related`;
  var response = await fetch(
    reqUrl,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": process.env.TRAKT_CLIENT_ID,
        "Authorization": `Bearer ${token}`,
      }
    }
  );
  return await response.json();
}

// New function to get the top 15 most watched shows
async function getMostWatchedShows() {
  let reqUrl = `${trakt}/shows/watched/all?limit=15`;
  var response = await fetch(
    reqUrl,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": 2,
        "trakt-api-key": process.env.TRAKT_CLIENT_ID
      }
    }
  );
  return await response.json();
}

module.exports = {
  getTrendingMovies,
  getRelatedMovies,
  getMostWatchedShows // Export the new function
};
