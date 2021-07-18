import React from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
} from 'recharts';
import styled from 'styled-components';

const GraphicWrapper = styled.div`
  height: 300px;
`;

const OrdersDesription = styled.div`
  padding-top: 80px;
`;

const List = styled.li`
  list-style: none;
  background-color: ${(props) => props.color};
  color:#fff;
  padding: 2px 7px;
  border-radius: 50px;
`;

const data = [
  { name: 'Group A', value: 70 },
  { name: 'Group B', value: 30 },
];

const COLORS = ['#0088FE', '#00C49F'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const InvoicesStatusGraphic = () => (
  <div className="row">
    <div className="five columns">
      <GraphicWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={800} height={800}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="u-cf" />
      </GraphicWrapper>
    </div>
    <div className="seven columns">
      <OrdersDesription>
        <ul>
          <List color={COLORS[0]}>Paid</List>
          <List color={COLORS[1]}>Unpaid</List>
        </ul>
      </OrdersDesription>
    </div>
  </div>
);

export default InvoicesStatusGraphic;
