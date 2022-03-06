import Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().port().required(),
  SELF_API_URL: Joi.string().required(),
  DB_HOST: Joi.string().hostname().required(),
  DB_PORT: Joi.number().port().required(),
  DB_NAME: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  // jwt
  JWT_SECRET: Joi.string().required(),
  JWT_SECRET_EXPIRES_IN: Joi.string().required(),
  // aws
  AWS_ACCESS_KEY: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  // s3
  S3_REGION_NAME: Joi.string().required(),
  S3_PUBLIC_BUCKET_NAME: Joi.string().required(),
  S3_PUT_ACTION_EXPIRES_SEC: Joi.number().integer().required(),
  S3_GET_ACTION_EXPIRES_SEC: Joi.number().integer().required(),
  // auth0
  AUTH0_ISSUER_URL: Joi.string().required(),
  AUTH0_AUDIENCE: Joi.string().required(),
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const configuration = () => ({
  selfApiUrl: process.env.SELF_API_URL,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string, 10),
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: parseInt(process.env.JWT_SECRET_EXPIRES_IN as string, 10),
  },
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  s3: {
    region: process.env.S3_REGION_NAME,
    publicBucket: process.env.S3_PUBLIC_BUCKET_NAME,
    putActionExpiresSec: parseInt(process.env.S3_PUT_ACTION_EXPIRES_SEC as string, 10),
    getActionExpiresSec: parseInt(process.env.S3_GET_ACTION_EXPIRES_SEC as string, 10),
  },
  auth0: {
    issuerUrl: process.env.AUTH0_ISSUER_URL,
    audience: process.env.AUTH0_AUDIENCE,
  },
});

export const validationOptions = {
  abortEarly: true,
};
