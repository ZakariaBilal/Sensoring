const constants = {
  HOST_URL: process.env.REACT_APP_HOST_URL || 'localhost:3500/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

export default constants;
