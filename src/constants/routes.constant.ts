enum AppRoutes {
  dashboard = '/',
  show = '/show',
}

enum ApiRoutes {
  apiShows = 'https://api.tvmaze.com/shows',
  apiSearchShows = 'https://api.tvmaze.com/search/shows',
}

export const Routes = {
  ...AppRoutes,
  ...ApiRoutes,
};
