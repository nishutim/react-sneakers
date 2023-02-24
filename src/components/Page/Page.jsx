import React from 'react';
import s from './styles.module.scss';
import Container from '../Container/Container';

const Page = ({ children }) => {
   return (
      <main className={s.page}>
         <Container>
            {children}
         </Container>
      </main>
   )
}

export default Page;