import React from 'react';

const Wojciech = React.lazy(() => import('./Wojciech'));

const WojciechConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'wojciech',
      element: <Wojciech />,
    },
  ],
};

export default WojciechConfig;

