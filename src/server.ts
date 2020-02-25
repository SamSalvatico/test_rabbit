import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import App from './App';
import loggerMiddleware from './middleware/Logger';

// import loggerMiddleware from './middleware/logger'

// import PostsController from './controllers/posts/posts.controller'
import HomeController from './controllers/index.controller';

dotenv.config();

let path;
switch (process.env.NODE_ENV) {
  case 'test':
    path = `${__dirname}/../../.env.test`;
    break;
  case 'production':
    path = `${__dirname}/../../.env.production`;
    break;
  default:
    path = `${__dirname}/../../.env.development`;
}
dotenv.config({ path });

export const { APP_ID } = process.env;
export const { LOG_LEVEL } = process.env;

// const { PORT = 3000 } = process.env.PORT;
const port = 3000;

const app = new App({
  port,
  controllers: [new HomeController()],
  middleWares: [loggerMiddleware, bodyParser.json(), bodyParser.urlencoded({ extended: true })],
});

app.listen();
