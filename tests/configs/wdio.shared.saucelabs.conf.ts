import { config } from './wdio.shared.conf';

// ==============
// Add Sauce Labs
// ==============
config.user = process.env.SAUCE_USERNAME;
config.key = process.env.SAUCE_ACCESS_KEY;
config.region = 'eu';

config.services = config.services.concat(['sauce']);

export { config };
