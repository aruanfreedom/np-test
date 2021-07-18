import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const OrderInfo = styled.div`
  background: #f48fb1;
  color: #000;
  text-align: center;
  padding: 35px 0;
`;

const Description = styled.div`
  padding: 31px 35px 0 0;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UnderlineWrapper = styled.div`
  border-bottom: 2px solid #D1D1D1;
  margin-bottom: 2rem;

  h5 {
    margin-bottom: 0;
  }
`;

const Card = styled.div`
  border: 1px solid #D1D1D1;
  box-shadow: 8px 8px 1px 1px rgb(51 195 240 / 90%);
`;

const Order = ({
  number, time, clientName, product, price,
}) => (
  <div>
    <div className="row">
      <Card>
        <div className="three columns">
          <OrderInfo>
            <h5>
              Order #
              {number}
            </h5>
            <span>{time}</span>
          </OrderInfo>
        </div>
        <div className="nine columns">
          <Description>
            <UnderlineWrapper>
              <h5>{ clientName }</h5>
            </UnderlineWrapper>
            <Product>
              <div><span>{product}</span></div>
              <div><span>{price}</span></div>
            </Product>
          </Description>
        </div>
        <div className="u-cf" />
      </Card>
    </div>
  </div>
);

Order.propTypes = {
  number: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  clientName: PropTypes.string.isRequired,
  product: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default Order;
