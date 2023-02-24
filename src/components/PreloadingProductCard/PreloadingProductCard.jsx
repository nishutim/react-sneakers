import React from 'react';
import ContentLoader from "react-content-loader";
import s from './styles.module.scss';

const PreloadingProductCard = (props) => {
   return (
      <ContentLoader
         speed={2}
         width={210}
         height={275}
         viewBox="0 0 210 275"
         backgroundColor="#f3f3f3"
         foregroundColor="#ecebeb"
         className={s.preloadingCard}
         {...props}
      >
         <rect x="4" y="24" rx="0" ry="0" width="0" height="1" />
         <rect x="30" y="34" rx="10" ry="10" width="148" height="111" />
         <rect x="30" y="161" rx="3" ry="3" width="148" height="15" />
         <rect x="30" y="217" rx="8" ry="8" width="80" height="24" />
         <rect x="30" y="180" rx="3" ry="3" width="95" height="15" />
         <rect x="146" y="211" rx="8" ry="8" width="32" height="32" />
      </ContentLoader>
   )
}

export default PreloadingProductCard;