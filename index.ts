import './public/reset.scss';
import './public/index.scss';
import { init } from './src/App';

try {
  init();
} catch (e) {
  console.error(e);
}
