import { HeaderNav } from './components'
import { useRoutes } from 'react-router-dom';
import router from './routes';
import React from 'react';
function App() {
  const ElementRouter = useRoutes(router);

  return <div>
    <HeaderNav />
    <main>
      {ElementRouter}
    </main>

  </div>
}

export default App
