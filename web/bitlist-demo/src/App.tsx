import { HeaderNav } from './components'
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import React from 'react';
function App() {
  return <div>
    <HeaderNav />
    <main>
      <RouterProvider router={router} />
    </main>
  </div>
}

export default App
