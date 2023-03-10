import { app } from 'electron';
import { execSync } from 'child_process';
import path from 'path';
import cli from './worker/cli';

const isPackaged =
  path.basename(process.argv[0], '.exe').startsWith('electron') == false;
const debugMode = isPackaged || process.env.NODE_ENV === 'development';
const resourcePath = isPackaged ? process.resourcesPath : '.';
const pythonPath = path.resolve(
  path.join(
    resourcePath,
    process.platform === 'win32'
      ? 'build/.venv/Scripts/python'
      : 'build/.venv/bin/python'
  )
);

async function main() {
  if (debugMode) {
    console.log('THIS IS DEBUG MODE');
  }

  await cli({
    resourceDir: resourcePath,
    debugMode: debugMode,
    pythonPath: pythonPath,
    arguments: process.argv.slice(isPackaged ? 1 : 2),
  });
  app.exit(0);
}

main()
  .catch((e) => {
    console.log(e);
    app.exit(255);
  })
  .finally(() => {
    app.exit(255);
  });
