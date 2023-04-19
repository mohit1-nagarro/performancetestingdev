import { ComponentProps } from 'lib/component-props';

import Image from 'next/image';
import recentActivityLogo from '../assets/images/recentActivityLogo.svg';
import style from '../assets/recentActivities.module.css';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
type RecentActivitiesProps = ComponentProps & {
  fields: {
    heading: string;
  };
};
const list = [
  { img: recentActivityLogo, activityName: 'Created a Post', date: '10 Jan 2022' },
  { img: recentActivityLogo, activityName: 'Liked a Post', date: '13 Feb 2023' },
  { img: recentActivityLogo, activityName: 'Created a Article', date: '18 Dec 2021' },
];

const RecentActivities = (props: RecentActivitiesProps): JSX.Element => {
  console.log(props);
  // const router = useRouter();
  // const onMemberClick = (email: string) => {
  //   router.push(`/profile/${email}`);
  // };
  return (
    <>
      <div className={style.recentActivityListBox}>
        <div className={`d-flex justify-content-between`}>
          <h3 className={style.recentActivityTitle}>Your Recent Activities</h3>
          <h6 className={style.viewAllButton}>See All</h6>
        </div>
        <div className={style.recentActivityList}>
          {list.map((ele, index: number) => (
            <>
              <div
                key={index}
                className={style.recentActivityListHeading}
                // onClick={() => {
                //   onMemberClick(ele.objectId);
                // }}
              >
                <div className={style.recentActivityListHeadingLeft}>
                  <Image
                    src={ele.img}
                    alt={ele.activityName}
                    className={style.recentActivityListLogo}
                    height={50}
                  />
                  <div className={`d-flex flex-column ${style.recentActivityNameAndDate}`}>
                    <h5 className={style.recentActivityName}>{ele.activityName}</h5>
                    <h6 className={style.recentActivityDate}>{ele.date}</h6>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

// export default withDatasourceCheck()<RecentActivitiesProps>(RecentActivities);

export default RecentActivities;