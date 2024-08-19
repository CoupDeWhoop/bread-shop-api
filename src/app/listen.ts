import http from 'http';
import app from './app';

// default port
const { PORT = 3000 } = process.env;

// Creates an HTTP server and pass the Express app as the request handler
const server = new http.Server(app);
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT} \n http://localhost:${PORT}`);
});
