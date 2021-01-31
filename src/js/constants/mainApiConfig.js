const MAIN_API_CONFIG = {
  // url: 'https://api.nws-explorer.tk',
  url: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  routes: {
    signup: '/signup',
    signin: '/signin',
    getUser: '/users/me',
    articles: '/articles',
    logout: '/logout',
  },
};

export default MAIN_API_CONFIG;
