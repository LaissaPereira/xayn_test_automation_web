import { defineConfig } from "cypress";
import { spawn } from 'child_process';
import path from 'path';

export default defineConfig({
    e2e: {
      baseUrl: 'http://localhost:3000',
      setupNodeEvents(on, config) {
        let serverProcess: ReturnType<typeof spawn>;
  
        on('before:run', () => {
          console.log('🔧 Starting http-server...');
          const serveDir = path.resolve(__dirname, '..', 'task');

          serverProcess = spawn('npx', ['http-server', '.', '-p', '3000'], {
            cwd: serveDir,
            shell: true,
            stdio: 'inherit',
          });
        });
  
        on('after:run', () => {
          console.log('🛑 Stopping http-server...');
          if (serverProcess) {
            serverProcess.kill();
          }
        });
  
        return config;
      },
    },
  });
