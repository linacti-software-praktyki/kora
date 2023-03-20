import React from 'react';

const Mati = React.lazy(() => import('./Mati'));

const MatiConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'mati',
      element: <Mati />,
    },
  ],
};

export default MatiConfig;

