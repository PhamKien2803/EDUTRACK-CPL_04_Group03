import jsonServer from 'json-server';
const server = jsonServer.create();
const router = jsonServer.router('database.json'); // Đảm bảo rằng đường dẫn đến file JSON là đúng
const middlewares = jsonServer.defaults();

//  middleware xử lý CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH'); // Các phương thức HTTP được phép
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Các header cho phép
  next();
});

server.use(middlewares);
server.use(router);

server.listen(9999, () => {
  console.log('JSON Server is running on http://localhost:9999');
});
