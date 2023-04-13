// import { Component } from 'react';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmitForm }) => {
  const [search, setSearch] = useState('');

  const onChange = ({ target }) => {
    setSearch(target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    onSubmitForm(search);
  };
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onSubmit}>
        <button type="submit" className="SearchForm-button">
          <AiOutlineSearch className="searchForm_button_icon" />
        </button>
        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};
