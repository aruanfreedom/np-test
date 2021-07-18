import React from 'react';
import styled from 'styled-components';

import Order from './order';

const MarginWrapper = styled.div`
  margin-bottom: 25px;
`;

const LastOrders = () => (
  <div>
    <div>
      <h5>Last 5 orders:</h5>
    </div>
    <MarginWrapper>
      <Order number="001" time="10:00 AM" clientName="Tom Late" product="Late x2" price="150.00$" />
    </MarginWrapper>
    <MarginWrapper>
      <Order number="002" time="10:00 AM" clientName="Tom Late" product="Late x2" price="150.00$" />
    </MarginWrapper>
    <MarginWrapper>
      <Order number="003" time="10:00 AM" clientName="Tom Late" product="Late x2" price="150.00$" />
    </MarginWrapper>
    <MarginWrapper>
      <Order number="004" time="10:00 AM" clientName="Tom Late" product="Late x2" price="150.00$" />
    </MarginWrapper>
    <MarginWrapper>
      <Order number="005" time="10:00 AM" clientName="Tom Late" product="Late x2" price="150.00$" />
    </MarginWrapper>
  </div>
);

export default LastOrders;
