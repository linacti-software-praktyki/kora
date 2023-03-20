import React from 'react';

const Piotr = React.lazy(() => import('./Piotr'));

const PiotrConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'piotr',
      element: <Piotr />,
    },
  ],
};

export default PiotrConfig;

