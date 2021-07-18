import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

import useFilter from '../../hooks/filter';
import constants from '../../constants';

const FiltersWrapper = styled.div`
  padding: 15px 0 25px 0;
`;

const SecondSection = styled.div`
  padding: 15px 0;
`;

const ButtonClear = styled.button`
  margin-top: 28px;
`;

const DateInput = styled.input`
  height: 38px;
  padding: 6px 10px;
  background-color: #fff;
  border: 1px solid #D1D1D1;
  border-radius: 4px;
  box-shadow: none;
  box-sizing: border-box;
`;

const OrdersFilter = () => {
  const { usecase: handleFilter, clear: clearFilter } = useFilter();
  const [values, setValues] = useState({
    [constants.NAME_OR_EMAIL]: '',
    [constants.MEALS]: '',
    [constants.STATUS]: '',
    [constants.DATE]: '',
    [constants.START_DATE]: '',
  });

  const handleSearch = useCallback(({ target: { value } }, nameFilter) => {
    setValues((prevValues) => ({ ...prevValues, [nameFilter]: value }));
    handleFilter({ value: { [nameFilter]: value } });
  }, []);

  const handleDate = useCallback(({ target: { value } }, nameFilter) => {
    setValues((prevValues) => ({ ...prevValues, [nameFilter]: value }));
    const date = value ? format(new Date(value), constants.FORMAT_DATE) : '';
    handleFilter({ value: { [constants.DATE]: date } });
  }, []);

  const handleClear = useCallback(() => {
    clearFilter();
    setValues({
      [constants.NAME_OR_EMAIL]: '',
      [constants.MEALS]: '',
      [constants.STATUS]: '',
      [constants.DATE]: '',
      [constants.START_DATE]: '',
    });
  }, []);

  return (
    <FiltersWrapper>
      <div className="row">
        <div className="six columns">
          <label htmlFor="name">Search</label>
          <input
            id="name"
            value={values[constants.NAME_OR_EMAIL]}
            className="u-full-width"
            type="text"
            onChange={(e) => handleSearch(e, constants.NAME_OR_EMAIL)}
          />
        </div>
        <div className="three columns">
          <label htmlFor="date">Date</label>
          <DateInput
            id="date"
            value={values[constants.DATE]}
            type="date"
            className="u-full-width"
            onChange={(e) => handleDate(e, constants.DATE)}
          />
        </div>
        <div className="three columns">
          <label htmlFor="start-date">Start Date</label>
          <DateInput
            id="start-date"
            value={values[constants.START_DATE]}
            type="date"
            className="u-full-width"
            onChange={(e) => handleDate(e, constants.START_DATE)}
          />
        </div>
      </div>
      <div className="row">
        <SecondSection>
          <div className="three columns">
            <label htmlFor="meals">Meals</label>
            <input
              id="meals"
              value={values[constants.MEALS]}
              type="number"
              className="u-full-width"
              onChange={(e) => handleSearch(e, constants.MEALS)}
            />
          </div>
          <div className="six columns">
            <label htmlFor="status">Invoice status</label>
            <select
              className="u-full-width"
              id="status"
              value={values[constants.STATUS] === '' ? 'true' : values[constants.STATUS]}
              onChange={(e) => handleSearch(e, constants.STATUS)}
            >
              <option active value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <div className="three columns">
            <ButtonClear type="button" className="u-full-width" onClick={handleClear}>Clear</ButtonClear>
          </div>
        </SecondSection>
      </div>
    </FiltersWrapper>
  );
};

export default OrdersFilter;
