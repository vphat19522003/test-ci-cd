import fs from 'fs';
import path from 'path';

export const createLogFile = function (dirname: string): fs.WriteStream {
  const logDirectory = path.join(dirname, 'log');

  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
  }

  const logFile = path.join(logDirectory, 'access.log');

  const accessLogStream = fs.createWriteStream(logFile, { flags: 'a' });

  return accessLogStream;
};
