npm init -y
npm install koa koa-bodyparser @koa/cors @koa/router dotenv bcryptjs http-errors jsonwebtoken knex pg validatorjs koa-helmet
npm install -D nodemon typescript ts-node @types/node @types/koa @types/koa-bodyparser @types/koa__cors @types/koa__router @types/bcryptjs @types/http-errors @types/jsonwebtoken @types/knex @types/pg @types/validatorjs
npx tsc --init
npx eslint --init
# tsconfig.json
# {
#   "compilerOptions": {
#     "rootDir": "./src",
#     "outDir": "./build",
#     "module": "commonjs",
#     "lib": ["es2021"],
#     "target": "es2018",
#     "esModuleInterop": true,
#     "strict": true
#   },
#   "include": ["src/**/*.ts"]
# }


knex init -x ts
