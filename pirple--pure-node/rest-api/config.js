/**
 * Create and export configuration
 */

const DEFAULT_ENV = 'staging';

const staging = {
  https: false,
  port: 3000,
  envName: 'staging',
  hashingSecret: 'SecretKey',
};

const production = {
  https: true,
  port: 5000,
  envName: 'production',
  hashingSecret: 'AnotherSecrectKey',
};

const env = {
  staging,
  production,
};

const environmentName = `${process.env.NODE_ENVIRONMENT}`.toLowerCase();
module.exports =
  environmentName in env ? env[environmentName] : env[DEFAULT_ENV];
