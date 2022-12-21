import React from 'react';

const Subpage = React.lazy(() => import('./Subpage'));

const SubpageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'subpage',
      element: <Subpage />,
    },
  ],
};

export default SubpageConfig;