import React from 'react';
import User from './User';
import styles from '../assets/searchFilterContainer.module.css';
import { SearchSkeletonForUser } from './skeletons/SearchSkeleton';
import style from '../assets/searchFilterContainer.module.css';

const SearchUserContainer = (props: any) => {
  console.log('props?.searchedData', props);
  return (
    <div className={styles.parentContainer}>
      <div className={styles.generalcontainer}>
        {props?.success ? (
          <SearchSkeletonForUser count={5} />
        ) : (
          <>
            {' '}
            {props?.searchedData.length > 0 ? (
              <div className={styles.hashtagCount}>
                <div>
                  <img src={'https://cdn-icons-png.flaticon.com/512/149/149071.png'} />
                  Users
                  {/* {props?.query} */}
                </div>
                <div>
                  <div>We've found {props?.searchedData.length} results</div>
                </div>
              </div>
            ) : (
              ''
            )}
            {props?.searchedData.length > 0 ? (
              props?.searchedData.map((data: any) => {
                return data?.index === 'accelerator-user' ? <User user={data?.sourceAsMap} /> : '';
              })
            ) : (
              <div className={style.forNoData}>No User Found</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchUserContainer;
