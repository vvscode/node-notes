/**
 * Create and export configuration
 */

const DEFAULT_ENV = 'staging';

const staging = {
  port: 3000,
  envName: 'staging',
};

const production = {
  port: 5000,
  envName: 'production',
};

const env = {
  staging,
  production,
};

const environmentName = `${process.env.NODE_ENVIRONMENT}`.toLowerCase();
module.exports =
  environmentName in env ? env[environmentName] : env[DEFAULT_ENV];
