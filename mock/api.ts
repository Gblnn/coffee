export default {
    // support Object and Array as return data
    'GET /api/users': { users: [1, 2] },
  
    // GET can be omitted
    '/api/users/1': { id: 1 },
  
    // support customized functions，please refer to express@4 for more details of the API
    'POST /api/users/create': (res) => {
      // add cors header
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end('ok');
    },
  }