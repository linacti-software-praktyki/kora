import React from 'react';

const Dominik = React.lazy(() => import('./Dominik'));

const DominikConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'dominik',
      element: <Dominik />,
    },
  ],
};

export default DominikConfig;

