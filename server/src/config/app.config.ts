import { ConfigModuleOptions } from '@nestjs/config';
import Joi from 'joi';

export const immichAppConfig: ConfigModuleOptions = {
  envFilePath: '.env',
  isGlobal: true,
  validationSchema: Joi.object({
    NODE_ENV: Joi.string().required().valid('development', 'production', 'staging').default('development'),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_DATABASE_NAME: Joi.string().required(),
    UPLOAD_LOCATION: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    OAUTH2_ENABLE: Joi.boolean().optional(),
    LOCAL_USERS_DISABLE: Joi.boolean().optional(),
    OAUTH2_DISCOVERY_URL: Joi.any().when('OAUTH2_ENABLE', {
      is: true,
      then: Joi.string().required(),
      otherwise: Joi.optional(),
    }),
    OAUTH2_CLIENT_ID: Joi.any().when('OAUTH2_ENABLE', {
      is: true,
      then: Joi.string().required(),
      otherwise: Joi.optional(),
    }),
    OAUTH2_CLIENT_SECRET: Joi.any().when('OAUTH2_ENABLE', {
      is: true,
      then: Joi.string().required(),
      otherwise: Joi.optional(),
    }),
    ENABLE_MAPBOX: Joi.boolean().required().valid(true, false),
    MAPBOX_KEY: Joi.any().when('ENABLE_MAPBOX', {
      is: false,
      then: Joi.string().optional().allow(null, ''),
      otherwise: Joi.string().required(),
    }),
  }),
};
