import React from 'react';

const Finances = React.lazy(() => import('./Finances'));

const FinancesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'Finances',
      element: <Finances />,
    },
  ],
};

export default FinancesConfig;

