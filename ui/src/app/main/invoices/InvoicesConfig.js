import React from 'react';

const Invoices = React.lazy(() => import('./Invoices'));

const InvoicesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'invoices',
      element: <Invoices />,
    },
  ],
};

export default InvoicesConfig;

