import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';

import { FilterField } from './Filter.styled';

const filterId = shortid.generate();

export const Filter = ({ filter, onChange }) => {
  return (
    <FilterField>
      <label htmlFor={filterId}>Find contacts by name</label>
      <input
        onChange={onChange}
        type="text"
        name="filter"
        id={filterId}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        value={filter}
      />
    </FilterField>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
