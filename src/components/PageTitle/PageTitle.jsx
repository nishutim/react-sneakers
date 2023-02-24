import React from 'react';
import s from './styles.module.scss';

const PageTitle = ({ className = '', children }) => {
   return (
      <h2 className={className ? `${s.pageTitle} ${className}` : s.pageTitle}>{children}</h2>
   )
}

export default PageTitle;