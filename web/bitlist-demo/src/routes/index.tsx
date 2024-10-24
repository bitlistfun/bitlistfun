import About from '../pages/abount';
import BitwisePages from '../pages/BitwisePages';

const router = [

  {
    path: '/about',
    element: <About />
  },
  {
    path: '/',
    element: <BitwisePages />

  }
]

export default router;

