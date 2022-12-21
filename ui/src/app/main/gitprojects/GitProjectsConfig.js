import React from 'react';

const GitProjects = React.lazy(() => import('./GitProjects'));

const GitProjectsConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: 'projects',
      element: <GitProjects />
    }
  ]
}

export default GitProjectsConfig;

