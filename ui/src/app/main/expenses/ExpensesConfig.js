import React from 'react';

const Expenses = React.lazy(() => import('./Expenses'));

const ExpensesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'expenses',
      element: <Expenses />,
    },
  ],
};

export default ExpensesConfig;

