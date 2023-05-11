import React, { useEffect, useState } from 'react';
import styles from '../assets/searchFilterContainer.module.css';
import Event from './Event';
import SideSearchFilter from './sideSearchFilter';
import { SearchSkeletonForEvents } from './skeletons/SearchSkeleton';

const EventSearchContainer = (props: any) => {
  useEffect(() => {
    setEvents(props?.searchedData);
  }, [props?.searchedData]);

  const getFormatedDate = (stringDate: string) => {
    const date = new Date(stringDate);

    // Get month abbreviation
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);

    // Get day with leading zero if necessary
    const day = String(date.getDate()).padStart(2, '0');

    // Get full year
    const year = date.getFullYear();

    // Combine into formatted string
    const formattedDate = `${month} ${day} ${year}`;

    return formattedDate;
  };

  const [Events, setEvents] = useState<any>(props?.searchedData);
  const [filterState, setFilterState] = useState<any>([]);

  const [filteredArray, setFilteredArray] = useState<any>(['Upcoming', 'Current', 'Past']);
  const [searchedfilterState, setSearchedFilterState] = useState<string>('');

  const handleFilters = (filter: any) => {
    setFilterState([filter]);
  };

  const searchedFilter = (e: string) => {
    setSearchedFilterState(e);
  };

  const filterdData = (e: any) => {
    e.preventDefault();
    if (searchedfilterState === '') {
      setFilteredArray(['Upcoming', 'Current', 'Past']);
    } else {
      const filterArray = filteredArray?.filter((filter: any) => {
        return filter === searchedfilterState;
      });
      setFilteredArray(filterArray);
    }
  };

  const resetFilter = () => {
    setSearchedFilterState('');
    setFilteredArray(['Upcoming', 'Current', 'Past']);
  };

  const filtration = (event: any) => {
    setFilterState([event]);
    if (event === 'Upcoming') {
      let upcomingDateEvents = props?.searchedData?.filter((item: any) => {
        return item?.sourceAsMap?.postType === 'EVENT'
          ? new Date(item?.sourceAsMap?.event?.eventDate) > new Date()
          : '';
      });
      setEvents(upcomingDateEvents);
    } else if (event === 'Current') {
      let currentDateEvents = props?.searchedData?.filter((item: any) => {
        return item?.sourceAsMap?.postType === 'EVENT'
          ? new Date(item?.sourceAsMap?.event?.eventDate) === new Date()
          : '';
      });
      setEvents(currentDateEvents);
    } else if (event === 'Past') {
      let pastDateEvents = props?.searchedData?.filter((item: any) => {
        return item?.sourceAsMap?.postType === 'EVENT'
          ? new Date(item?.sourceAsMap?.event?.eventDate) < new Date()
          : '';
      });
      setEvents(pastDateEvents);
    } else {
      setEvents(props?.searchedData);
    }
  };

  const clearFilter = () => {
    setFilterState([]);
    setEvents(props?.searchedData);
  };
  return (
    <div className={styles.parentContainer}>
      <div className={styles.filterContainer}>
        <SideSearchFilter
          filtration={filtration}
          filterState={filterState}
          clearFilter={clearFilter}
          searchedFilter={searchedFilter}
          resetFilter={resetFilter}
          searchedfilterState={searchedfilterState}
          filterdData={filterdData}
          filteredArray={filteredArray}
          handleFilters={handleFilters}
        />
      </div>
      <div className={styles.generalcontainer}>
        {props?.success ? (
          <SearchSkeletonForEvents count={5} />
        ) : (
          <>
            {Events.length > 0 ?<div className={styles.hashtagCount}>
              <div>
                <img
                  src={
                    'https://media.istockphoto.com/id/499517325/photo/a-man-speaking-at-a-business-conference.jpg?s=612x612&w=0&k=20&c=gWTTDs_Hl6AEGOunoQ2LsjrcTJkknf9G8BGqsywyEtE='
                  }
                />
                {props?.query}
              </div>
              <div>
                <div>We've found {Events?.length} results</div>
              </div>
            </div>:""}
            {Events.length > 0 ? (
              Events.map((event: any) => {
                return event?.sourceAsMap?.postType === 'EVENT' ? (
                  <Event events={event?.sourceAsMap} getFormatedDate={getFormatedDate} />
                ) : (
                  ''
                );
              })
            ) : (
              <div className={styles.forNoData}>No Events Found</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EventSearchContainer;
