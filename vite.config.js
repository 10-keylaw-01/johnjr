import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Serves the Vercel-style functions in /api during `vite` dev.
const apiRoutes = {
  '/api/mpesa/stk-push': './api/mpesa/stk-push.js',
  '/api/mpesa/status': './api/mpesa/status.js',
  '/api/payments/daraja-callback': './api/payments/daraja-callback.js',
};

const readJsonBody = req =>
  new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });

const sendJson = (res, statusCode, payload) => {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
};

const localApiPlugin = () => ({
  name: 'local-api',
  configureServer(server) {
    Object.entries(apiRoutes).forEach(([route, file]) => {
      server.middlewares.use(route, async (req, res) => {
        try {
          const { default: handler } = await import(
            /* @vite-ignore */ pathToFileURL(path.resolve(process.cwd(), file)).href
          );
          req.body = await readJsonBody(req);
          await handler(req, {
            setHeader: (name, value) => res.setHeader(name, value),
            status(code) {
              res.statusCode = code;
              return this;
            },
            json: payload => sendJson(res, res.statusCode || 200, payload),
          });
        } catch (error) {
          sendJson(res, 500, { message: error.message || 'API request failed' });
        }
      });
    });
  },
});

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return {
    plugins: [react(), tailwindcss(), localApiPlugin()],
  };
});
