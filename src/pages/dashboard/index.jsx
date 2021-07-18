import React from 'react';
import styled from 'styled-components';

import LastOrders from './components/lastOrders';
import OrdersGraphic from './components/ordersGraphic';
import InvoicesStatusGraphic from './components/invoicesStatus';
import TotalOrders from './components/totalOrders';
import OrdersDate from './components/ordersDate';
import OrdersDays from './components/ordersDays';

const MarginBlock = styled.div`
  margin: 20px 0;
`;

const Dashboard = () => (
  <div>
    <MarginBlock>
      <LastOrders />
    </MarginBlock>
    <MarginBlock>
      <OrdersGraphic />
    </MarginBlock>
    <MarginBlock>
      <InvoicesStatusGraphic />
    </MarginBlock>
    <MarginBlock>
      <TotalOrders />
    </MarginBlock>
    <MarginBlock>
      <OrdersDate />
    </MarginBlock>
    <MarginBlock>
      <OrdersDays />
    </MarginBlock>
  </div>
);

export default Dashboard;
