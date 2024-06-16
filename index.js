// import required modules
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const trakt = require("./modules/trakt/api");
const traktAuth = require("./modules/trakt/oauth");

// set up Express app
const app = express();
const port = process.env.PORT || 8888;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

let accessToken;

// PAGE ROUTES
app.get("/", async (request, response) => {
  let moviesList = await trakt.getTrendingMovies();
  console.log(moviesList);
  response.render("index", { title: "Movies", movies: moviesList });
});

app.get("/related/:id", async (request, response) => {
  let moviesList = await trakt.getRelatedMovies(request.params.id);
  console.log(moviesList);
  response.render("related", { title: "Related Movies", movies: moviesList });
});

app.get("/page-requiring-oauth", async (request, response) => {
  if (accessToken) {
    let userData = await trakt.getUserData("YOUR_SLUG", accessToken); // function to display secured data
    console.log(userData);
  } else {
    let authUrl = traktAuth.startAuthorizing(); // if no accessToken, kickstart the OAuth process
    response.redirect(authUrl);
  }
});

app.get("/authorize", async (request, response) => {
  if (request.query.code && !accessToken) {
    token = await traktAuth.getAccessToken(request.query.code); // if there is code, get access token
    if (token.access_token) {
      accessToken = token.access_token;
      response.redirect("/page-requiring-oauth");
    }
  } else {
    console.log("start again");
  }
});

// New route for most watched shows
app.get("/most-watched-shows", async (request, response) => {
  let showsList = await trakt.getMostWatchedShows();
  console.log(showsList);
  response.render("show", { title: "Most Watched Shows", shows: showsList });
});

// set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
