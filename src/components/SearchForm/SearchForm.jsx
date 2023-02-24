import React from 'react'
import { FiSearch } from 'react-icons/fi';
import s from './styles.module.scss';

const SearchForm = ({ value, onChange }) => {
   return (
      <form className={s.searchForm}>
         <FiSearch size='14px' />
         <input
            type="text"
            onChange={onChange}
            value={value}
            placeholder='Поиск...' />
      </form>
   )
}

export default SearchForm;