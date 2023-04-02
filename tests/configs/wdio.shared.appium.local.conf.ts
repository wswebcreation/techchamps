import { config } from './wdio.shared.conf';

config.services = config.services.concat([
  [
    'appium',
    {
      // Appium logs will be written to `wdio-appium.log` in the root directory
      logPath: './',
      args: { logTimestamp: true, relaxedSecurity: true },
    },
  ],
]);
config.port = 4723;

export { config };
