import React from 'react';

const Dawid = React.lazy(() => import('./Dawid'));

const DawidConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'dawid',
      element: <Dawid />,
    },
  ],
};

export default DawidConfig;

