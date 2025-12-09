const {BackendApplication} = require('../dist');

let app;

async function getApp() {
  if (!app) {
    app = new BackendApplication({
      rest: {
        port: +(process.env.PORT ?? 3000),
        host: '0.0.0.0',
        openApiSpec: {
          setServersFromRequest: true,
        },
        cors: {
          origin: '*',
          methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
          preflightContinue: false,
          optionsSuccessStatus: 204,
          maxAge: 86400,
          credentials: true,
        },
      },
    });
    await app.boot();
  }
  return app;
}

// Export the Express request handler for Vercel
module.exports = async function handler(req, res) {
  const application = await getApp();
  const requestHandler = application.restServer.requestHandler;
  return requestHandler(req, res);
};

