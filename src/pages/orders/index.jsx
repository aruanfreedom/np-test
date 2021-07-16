import React, { useEffect } from 'react';
import Papa from 'papaparse';
import { useSelector, useDispatch } from 'react-redux';
import { addItems } from '../../reducers/orders';

const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const response = fetch('orders.csv', {
      method: 'get',
      headers: {
        'content-type': 'text/csv;charset=UTF-8',
      },
    }).then((res) => res.text())
      .then((res) => Papa.parse(res))
      .catch((err) => console.error(err));

    response.then((res) => dispatch(addItems(res.data)));
  }, []);

  useSelector((state) => state);

  return (
    <table className="u-full-width">
      <thead>
        <tr>
          <td>
            Name
          </td>
          <td>
            Rank
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cory</td>
          <td>SSG</td>
        </tr>
        <tr>
          <td>John</td>
          <td>CPL</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Orders;
