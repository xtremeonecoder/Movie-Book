# Movie Book - Application developed using React

A simple React Application for searching movies from the internet, reviewing detailed information about the movies, adding them into favorite and watch later list. The application is developed on the top of NodeJS Environment using React Framework and other essential NPM Packages, such as - Lodash, @Hapi/Joi, React-Bootstrap and so forth. The application uses Axios Framework for connecting Backend API, sending HTTP requests and receiving HTTP responses. It uses The Movie Database (TMDB) API for searching related movies.

### Live Demo: [Click Here to See The Live Demo](https://movie-book-7d1c3.firebaseapp.com)

## Application Features:

- A comprehensive, faster and efficient movie **_searching feature_**.
- Search results are displayed in a **_tabular format_** along with necessary brief information.
- In the search result table, all the **_informational columns are sortable_** (ascending or descending order).
- Search result comes with comprehensive and **_feasible pagination feature_**.
- Movie **_poster and title_** are directly **_linking to the movie details_** page.
- The application provides with **_favorite movies_** feature which enables users to **_add favorite movies_** to or **_remove favorite movies_** from their favorite movies list.
- **_Favorite Movies_** list comes with comprehensive, simple and good looking tabular format along with **_sortable informational columns_** as well as nice **_pagination feature_**.
- The application also provides with **_movie watchlist_** feature which enables users to **_add movies to watchlist_** or **_remove movies from watchlist_** for watching later.
- **_Movie Watchlist_** list comes with comprehensive, simple and good looking tabular format along with **_sortable informational columns_** as well as nice **_pagination feature_**.
- The application comes with super **_responsive features_**. It works absolutely fine on desktop, mobile and tablet platforms.
- The application has **_movie details feature_**, where movie primary poster, movie details (such as - _title, tagline, review, ratings, votes, popularity, released languages, released date, production countries, production companies, movie genres_, and so forth), movie image slideshow, secondary posters and movie trailer are being displayed.
- **_Favorite Movies_** and **_Movie Watchlist_** features are also incorporated with the movie details page for **_improving user experience_**.
- Automated **_Unit Test_** and **_Integration Test_** features are also incorporated with the project. For **_Unit and Integration Test_**, I have used following library packages - **_Jest_**, **_Enzyme_** and **_Check Prop Types_**.

## Configure The config.json File:

After cloning the project, you need to configure the **_config.json_** file. Please replace **_API KEY_**, **_REQUEST TOKEN_** and **_SESSION ID_** with valid data. See the following screenshot:

![Configuration file setup](https://github.com/xtremeonecoder/movie-book/blob/master/documentation/configuration.jpg)

## Automated Test (Unit & Integration Test):

I have written total 60 tests for this project, though there can be many other unit and integration tests possible, but for now I finished it with just 60 tests. For executing the automated test script simply enter the following command in your command line or terminal interface -

`npm test`

All the test are passing, you can check the below screenshot:

![Unit and Integration Test](https://github.com/xtremeonecoder/movie-book/blob/master/documentation/unit-and-integration-test.jpg)

## Test Cases for This Application:

### Test Case PDF File: [Click Here to Download](https://github.com/xtremeonecoder/movie-book/blob/master/documentation/Movie-Book-Test-Cases.pdf)

![Table of content for test cases](https://github.com/xtremeonecoder/movie-book/blob/master/documentation/table-of-contents.jpg)

![Movie Searching Functionality](https://github.com/xtremeonecoder/movie-book/blob/master/documentation/movie-searching-functionality.jpg)

![Add or Remove Favorite Movie Functionalities](https://github.com/xtremeonecoder/movie-book/blob/master/documentation/favorite-movie-functionality.jpg)

![Add or Remove Watchlist Movie Functionalities](https://github.com/xtremeonecoder/movie-book/blob/master/documentation/watchlist-movie-functionality.jpg)

![Movie Sorting Functionality](https://github.com/xtremeonecoder/movie-book/blob/master/documentation/movie-sorting-functionality.jpg)

![Pagination Functionality](https://github.com/xtremeonecoder/movie-book/blob/master/documentation/movie-pagination-functionality.jpg)

![Responsive Functionality](https://github.com/xtremeonecoder/movie-book/blob/master/documentation/movie-responsive-functionality.jpg)
