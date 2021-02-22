# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

## Example .env

```
PUBLIC_URL=localhost
CLIENT_URL=http://localhost:3000
NODE_ENV=development
SESSION_NAME=hhsid
SESSION_SECRET=secret
PORT=4000
FACEBOOK_CLIENT_ID=secret
FACEBOOK_CLIENT_SECRET=secret
GOOGLE_CLIENT_ID=secret
GOOGLE_CLIENT_SECRET=secret
GITHUB_CLIENT_ID=secret
GITHUB_CLIENT_SECRET=secret
CLOUDINARY_KEY=secret
CLOUDINARY_SECRET=secret
CLOUDINARY_NAME=secret
GOOGLE_GEOCODE_KEY=secret
STRIPE_CLIENT_ID=secret
STRIPE_CLIENT_SECRET=secret
TYPEORM_CONNECTION=postgres
TYPEORM_HOST=localhost
TYPEORM_USERNAME=postgres
TYPEORM_PASSWORD=admin
TYPEORM_DATABASE=test-home
TYPEORM_PORT=5432
TYPEORM_SYNCHRONIZE=true
TYPEORM_LOGGING=true
TYPEORM_DROP_SCHEMA=true
TYPEORM_ENTITIES=src/graphql/entities/**/*.ts
TYPEORM_MIGRATIONS=src/graphql/migrations/**/*.ts
TYPEORM_SUBSCRIBERS=src/graphql/subscribers/**/*.ts
TYPEORM_ENTITIES_DIR=src/graphql/entities
TYPEORM_MIGRATIONS_DIR=src/graphql/migrations
TYPEORM_SUBSCRIBERS_DIR=src/graphql/subscribers
```
