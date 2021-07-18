import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

import styled from 'styled-components';

const GraphicWrapper = styled.div`
  height: 300px;
`;

const List = styled.li`
  list-style: none;
  background-color: #000;
  color:#fff;
  padding: 2px 7px;
  border-radius: 50px;
`;

const data = [
  {
    name: '12:00 AM',
    uv: 4,
    pv: 2,
    amt: 2,
  },
  {
    name: '15:00 AM',
    uv: 3,
    pv: 1,
    amt: 1,
  },
  {
    name: '18:00 AM',
    uv: 2,
    pv: 9,
    amt: 3,
  },
];

const OrdersDate = () => (
  <div>
    <h4>Orders day 21.04.2021:</h4>
    <GraphicWrapper>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={700}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
      <div className="u-cf" />
    </GraphicWrapper>
  </div>
);

export default OrdersDate;
