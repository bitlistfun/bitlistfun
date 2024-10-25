import { createHashRouter } from 'react-router-dom';
import About from '../pages/abount';
import BitwisePages from '../pages/BitwisePages';


const router = createHashRouter([
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/',
    element: <BitwisePages />
  }
]);

export default router;

