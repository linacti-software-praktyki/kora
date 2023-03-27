import React from 'react';

const WorkTracker = React.lazy(() => import('./WorkTracker'));

const WorkTrackerConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'work-tracker',
      element: <WorkTracker />,
    },
  ],
};

export default WorkTrackerConfig;

