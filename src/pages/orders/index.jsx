import React, { useEffect, useCallback } from 'react';
import Papa from 'papaparse';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { format } from 'date-fns';

import { addItems, clearItems } from '../../reducers/orders';
import constants from '../../constants';

const Td = styled.td`
  fonr-size: 16px;
  font-weight: bold;
`;

const OrderBtn = styled.button`
  margin: 7px 0;
  font-weight: bold;
`;

const Empty = styled.tr`
  padding: 10px 0;
  font-weight: bold;
`;

const rows = {
  date: 1,
  name: 2,
  email: 4,
  startDate: 5,
  meals: 6,
  status: 7,
};

const Orders = () => {
  const dispatch = useDispatch();

  const filterItems = useCallback((items, filters) => items.filter((columns) => {
    const searchText = (rowNum, value) => (columns[rowNum].toLowerCase().search(value) !== -1);

    const searchDate = (rowNum, value) => (value
      ? format(new Date(columns[rowNum]), constants.FORMAT_DATE) === value
      : true);

    return (
      searchText(rows.name, filters[constants.NAME_OR_EMAIL])
    || searchText(rows.email, filters[constants.NAME_OR_EMAIL]))
    && searchText(rows.meals, filters[constants.MEALS])
    && searchText(rows.status, filters[constants.STATUS])
    && searchDate(rows.date, filters[constants.DATE])
    && searchDate(rows.startDate, filters[constants.START_DATE]);
  }), []);

  const { items, filters } = useSelector((state) => state.orders);
  const filteredItems = Object.values(filters).length ? filterItems(items, filters) : items;

  const normailizeData = useCallback((data) => data.slice(1, -2), []);

  useEffect(() => {
    const response = fetch('/orders.csv', {
      method: 'get',
      headers: {
        'content-type': 'text/csv;charset=UTF-8',
      },
    }).then((res) => res.text())
      .then((res) => Papa.parse(res))
      .catch((err) => console.error(err));

    response.then((res) => {
      const data = normailizeData(res.data);
      dispatch(addItems(data));
    });

    return () => {
      dispatch(clearItems());
    };
  }, []);

  return (
    <table className="u-full-width">
      <thead>
        <tr>
          <Td>Date</Td>
          <Td>Name</Td>
          <Td>Phone</Td>
          <Td>Email</Td>
          <Td>Start date</Td>
          <Td>Meals</Td>
          <Td>Invoice status</Td>
        </tr>
      </thead>
      <tbody>
        {filteredItems.length ? filteredItems.map((item) => {
          const [, date, name, phone, email, startDate, meals, invoiseStatus] = item;

          return (
            <tr key={phone}>
              <td>{date}</td>
              <td>{name}</td>
              <td>{phone}</td>
              <td>{email}</td>
              <td>{startDate}</td>
              <td>{meals}</td>
              <td>{invoiseStatus}</td>
              <td>
                <OrderBtn type="button" className="button-primary u-full-width">order</OrderBtn>
              </td>
            </tr>
          );
        }) : <Empty>Not data</Empty>}
      </tbody>
    </table>
  );
};

export default Orders;
