import React from 'react';

const WorkTracking = React.lazy(() => import('./WorkTracking'));

const WorkTrackingConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'work-tracking',
      element: <WorkTracking />,
    },
  ],
};

export default WorkTrackingConfig;

