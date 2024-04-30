module.exports = {
    apps: [
      {
        name: 'property-listing', // Your project name
        cwd: '/home/ubuntu/property-listing', // Path to your project
        script: 'npm', // For this example we're using npm, could also be yarn
        args: 'run build && npm run start', // Script to start the Strapi server, `start` by default
        env: {
          APP_KEYS: '3jfGymlTdbnYqAQwN80Lxw==,9b3yX0RiyQr043iyYefAew==,PYe1hlPmPBRQGQKBbpEyJQ==,dC9AF1FZX+/YHRsrWGrGGQ==', // you can find it in your project .env file.
          API_TOKEN_SALT: '8RrCIw95MQHdUwa3mi7AEg==',
          ADMIN_JWT_SECRET: 'uGnGRRBpzHgLjheRfkjysA==',
          JWT_SECRET: 'KmMvqguxt5AS6VbvAW1Wvg==',
          NODE_ENV: 'production',
          DATABASE_HOST: 'strapi-properties-listing.c524k8guo6m9.me-central-1.rds.amazonaws.com', // database Endpoint under 'Connectivity & Security' tab
          DATABASE_PORT: '5432',
          DATABASE_NAME: 'strapi', // DB name under 'Configuration' tab
          DATABASE_USERNAME: 'postgres', // default username
          DATABASE_PASSWORD: 'postgres',
          AWS_ACCESS_KEY_ID: 'aws-access-key-id',
          AWS_ACCESS_SECRET: 'aws-access-secret', // Find it in Amazon S3 Dashboard
          AWS_REGION: 'me-central-1',
          AWS_BUCKET_NAME: 'my-project-bucket-name',
        },
      },
    ],
  };

