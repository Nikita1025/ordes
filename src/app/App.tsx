import React from 'react';

import './App.scss';
import { RoutesComponent } from 'src/app/routes/RoutesComponent';
import { Layout } from 'src/components/layout';

const App = () => {
  return (
    <div className="App">
      <Layout>
        <RoutesComponent />
      </Layout>
    </div>
  );
};

export default App;
