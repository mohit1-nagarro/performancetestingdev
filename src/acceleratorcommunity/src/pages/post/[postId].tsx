import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
// import getPostByIdCall from 'src/API/getPostByIdCall';
import WebContext from '../../Context/WebContext';
import specificPostCss from '../../assets/specificPost.module.css';
import Profile from '../../assets/images/ProfilePic.jpeg';
// import Event from '../../assets/images/event.jpg';
// import commentSvg from '../../assets/images/comment-svgrepo-com 1.svg';
// import shareSvg from '../../assets/images/share.svg';
// import likeSvg from '../../assets/images/like-svgrepo-com 1.svg';
// import smile from '../../assets/images/smile-svgrepo-com 1.png';
// import camera from '../../assets/images/Rounded.png';
// import gallery from '../../assets/images/Vector.png';
// import Head from 'next/head';

// import { Form } from 'react-bootstrap';
import Head from 'next/head';
// import {calculateTimeDifference} from

// import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';

function viewSinglePost(props: any) {
  console.log('mudatatatata', props);
  const { userToken, objectId, userObject, setUserToken } = {
    ...useContext(WebContext),
  };

  const router = useRouter();
  console.log(router);

  //DeleteMe
  userToken;
  objectId;
  userObject;

  // let [postId, setPostId] = useState('');
  // let [post, setPost] = useState<any>([]);
  let [index, setIndex] = useState<any>(0);
  let [imagesAndVideos, setImagesAndVideos] = useState<any>([]);

  useEffect(() => {
    let arrayOfImagesAndVideos = props?.data?.data?.mediaList?.filter((dataum: any) => {
      return dataum?.mediaType === 'IMAGE' || dataum?.mediaType === 'VIDEO';
    });

    setImagesAndVideos(arrayOfImagesAndVideos);
  }, []);

  function getValueFromCookie(key: string): string | null {
    if (typeof document !== 'undefined') {
      const cookieString = document.cookie;
      const cookies = cookieString.split(';').reduce((acc: any, cookie: string) => {
        const [name, value] = cookie.split('=').map((c) => c.trim());
        acc[name] = value;
        return acc;
      }, {});

      return cookies[key] || null;
    }
    return null;
  }

  // function getQueryParams(url: string): string {
  //   const path = url.split('?')[0]; // Extract the path from the URL
  //   const routeSegments = path.split('/'); // Split the path by forward slash
  //   const lastRoute = routeSegments[routeSegments.length - 1]; // Get the last route segment

  //   return lastRoute;
  // }

  function calculateTimeDifference(postDate: any) {
    postDate = new Date(postDate);
    // Get current time in milliseconds
    const currentTime = new Date().getTime();

    // Calculate time difference in hours, minutes, and days
    const timeDiffMs = currentTime - postDate.getTime();
    const timeDiffHours = Math.floor(timeDiffMs / (1000 * 60 * 60));
    const timeDiffMinutes = Math.floor(timeDiffMs / (1000 * 60));
    const timeDiffDays = Math.floor(timeDiffMs / (1000 * 60 * 60 * 24));

    // Log the time difference in the appropriate unit
    if (timeDiffHours >= 24) {
      return `${timeDiffDays} ${timeDiffDays > 1 ? 'days' : 'day'} ago`;
    } else if (timeDiffMinutes >= 60) {
      return `${timeDiffHours} ${timeDiffDays > 1 ? 'hours' : 'hour'} ago`;
    } else {
      return `${timeDiffMinutes} ${timeDiffDays > 1 ? 'minutes' : 'minute'} ago`;
    }
  }

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     setPostId(getQueryParams(window?.location?.href));
  //   }
  //   if (typeof document != 'undefined') {
  //     let url = getValueFromCookie('routeToUrl');
  //     if (url != null) {
  //       url = decodeURIComponent(url);
  //     }
  //     let currUrl = window?.location?.pathname;
  //     if (currUrl == url) {
  //       document.cookie = `routeToUrl=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  //     }
  //   }
  // }, []);

  const goLeft = () => {
    const isFirstSlide = index === 0;
    const newIndex = isFirstSlide ? imagesAndVideos?.length - 1 : index - 1;
    setIndex(newIndex);
  };

  const goRight = () => {
    const isFirstSlide = index === imagesAndVideos?.length - 1;
    const newIndex = isFirstSlide ? 0 : index + 1;
    setIndex(newIndex);
  };

  useEffect(() => {
    if (userToken == '') {
      let token = getValueFromCookie('UserToken');
      if (typeof document !== 'undefined' && token != '' && token != null) {
        if (setUserToken != undefined) {
          setUserToken(token);
        }
      } else {
        router.push('/login');
      }
    }
  }, []);

  // useEffect(() => {
  //   if (postId != '') {
  //     getPostByIdCall(userToken, postId).then((response) => {
  //       console.log('datatatatatatattatatataata', response);
  //       if (response?.status == 200) {
  //         console.log(response?.data?.data);
  //         setPost(response?.data?.data);
  //       } else router.push('/404');
  //     });
  //   }
  // }, [postId]);

  // if (typeof document !== 'undefined') {
  //   document.cookie = 'hello=world;path=/';
  // }
  // const sliderSettings = {
  //   rows: 1,
  //   infinite: false,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 2,
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 1,
  //       },
  //     },
  //   ],
  // };
  var metaImage: any = {};
  var breakLoop = true;
  return (
    <>
      <div>
        {' '}
        <Head>
          {props?.data?.data?.mediaList?.forEach((element: any) => {
            if (element?.mediaType === 'IMAGE' && breakLoop) {
              metaImage = element;
              breakLoop = false;
            }
          })}
          <meta property="og:image" content={metaImage?.url} />
          <meta property="og:description" content={props?.data?.data?.description} />
          <meta
            property="og:title"
            content={props?.data?.data?.createdBy?.firstName.concat(
              ' ',
              props?.data?.data?.createdBy?.lastName
            )}
          />
        </Head>
      </div>
      {props?.data?.success ? (
        <div className={specificPostCss.parentContainer}>
          <div className={specificPostCss.cardContainer}>
            <div className={specificPostCss.header}>
              <div className={specificPostCss.userDetail}>
                <div>
                  <img className={specificPostCss.img} src={Profile?.src} alt="" />
                </div>
                <div className={specificPostCss.detail}>
                  <div className={specificPostCss.name}>
                    {' '}
                    <div>
                      {props?.data?.data?.createdBy?.firstName.concat(
                        ' ',
                        props?.data?.data?.createdBy?.lastName
                      )}
                    </div>
                  </div>
                  <div>{calculateTimeDifference(props?.data?.data?.createdOn)}</div>
                </div>
              </div>
              <div className={specificPostCss.actionContainer}>
                <button className={specificPostCss.dropDownBtn}>...</button>
                <div>X</div>
              </div>
            </div>

            {imagesAndVideos.length > 0 ? (
              <div className={specificPostCss.bannerImgContainer}>
                {imagesAndVideos?.length > 1 ? (
                  <>
                    <button onClick={goLeft} className={specificPostCss.btnLeft}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className={specificPostCss.btnIcon}
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </button>
                    <button onClick={goRight} className={specificPostCss.btnRight}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className={specificPostCss.btnIcon}
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                      </svg>
                    </button>
                    {/* <div className={specificPostCss.leftArrow} onClick={goLeft}>
                    &larr;
                  </div> */}
                    {/* 
                  <div className={specificPostCss.rightArrow} >
                    &rarr;
                  </div> */}
                  </>
                ) : (
                  ''
                )}

                {imagesAndVideos[index]?.mediaType === 'IMAGE' ? (
                  <img className={specificPostCss.bannerImg} src={imagesAndVideos[index]?.url} />
                ) : (
                  <video className={specificPostCss.video} controls id="video" preload="metadata">
                    <source src={imagesAndVideos[index]?.url} type="video/mp4" />
                  </video>
                )}
              </div>
            ) : (
              ''
            )}
            <div className={specificPostCss.documentContainer}>
              {props?.data?.data?.mediaList?.map((l: any) => {
                return l?.mediaType === 'DOCUMENT' ? (
                  <div className={specificPostCss.document}>
                    <a className={specificPostCss.links} href={l?.url} target="_blank">
                      {l?.url}
                    </a>
                  </div>
                ) : (
                  ''
                );
              })}
            </div>
            <div
              className={specificPostCss.body}
              dangerouslySetInnerHTML={{ __html: props?.data?.data?.description }}
            ></div>
            {/* <div className={specificPostCss.likeActionsContainer}>
            <div className={specificPostCss.actions}>
              <div className={specificPostCss.likeActions}>
                <div>
                  <img className={specificPostCss.icon} src={likeSvg.src} />
                </div>
                <span className={specificPostCss.text}>Like</span>
                <div className={specificPostCss.count}>
                  {props?.data?.data?.postMeasures?.likeCount}
                </div>
              </div>
              <div className={specificPostCss.likeActions}>
                <div>
                  <img className={specificPostCss.icon} src={commentSvg.src} />
                </div>
                <span className={specificPostCss.text}>Commet</span>
                <div className={specificPostCss.count}>1.7k</div>
              </div>{' '}
              <div className={specificPostCss.likeActions}>
                <div>
                  <img className={specificPostCss.icon} src={shareSvg.src} />
                </div>
                <span className={specificPostCss.text}>Share</span>
                <div className={specificPostCss.count}>
                  {props?.data?.data?.postMeasures?.repostCount}
                </div>
              </div>
            </div>
          </div> */}
            {/* <Form className={specificPostCss.formInput}>
            <Form.Group
              className="mb-3"
              controlId="comments"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Form.Control
                onChange={(e) => setPostComment(e.target.value)}
                type="text"
                placeholder="Add Comments..."
                required
                // autoFocus
                className={specificPostCss.input}
              />
              <div className={specificPostCss.icons}>
                <img className={specificPostCss.uploadIcon} src={smile.src} />
                <img className={specificPostCss.uploadIcon} src={camera.src} />
                <img className={specificPostCss.uploadIcon} src={gallery.src} />
              </div>
              <button
                type="button"
                onClick={() => {
                  postComments(post?.id, postComment);
                }}
                style={{
                  float: 'right',
                  marginLeft: '10px',
                  borderRadius: '10px',
                  padding: '5px',
                  border: 'none',
                  backgroundColor: '#008CBA',
                  color: 'white',
                  width: '30%',
                }}
              >
                PostComment
              </button>
            </Form.Group>
          </Form> */}

            {/* <div className={specificPostCss.commentContainer}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="User-Pic"
              className={specificPostCss.user}
            />
            <div className={specificPostCss.commentBody}>
              <div className={specificPostCss.comment}>
                <div className={specificPostCss.commentName}>Lucky</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, recusandae! In unde
                dolores recusandae cupiditate molestias dolore fugiat est ea autem eaque, nisi hic
                quasi voluptates quas et harum facere.
              </div>
              <div className={specificPostCss.commentLikeContainer}>
                <div>Like</div>
                <div>Reply</div>
                <div className={specificPostCss.commentTime}>3hr</div>
              </div>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="User-Pic"
                className={specificPostCss.replyUser}
              />
              <div className={specificPostCss.reply}>
                <div className={specificPostCss.replyName}>Lucky</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, recusandae! In unde
                dolores recusandae cupiditate molestias dolore fugiat est ea autem eaque, nisi hic
                quasi voluptates quas et harum facere.
              </div>
              <div className={specificPostCss.replyLikeContainer}>
                <div>Like</div>
                <div>Reply</div>
                <div className={specificPostCss.commentTime}>3hr</div>
              </div>
            </div>
          </div> */}
            {/* <div className={specificPostCss.viewMore}>View More Comments</div> */}
          </div>
        </div>
      ) : (
        <div className={specificPostCss.errorContainer}>{props?.data?.errorMessages}</div>
      )}
    </>
  );
}
export default viewSinglePost;

export async function getServerSideProps(context: any) {
  const { params } = context;
  const { postId } = params;
  const [name, value] = context?.req?.headers?.cookie?.split('=').map((c: any) => c.trim());
  console.log(name);
  let getAllPostURL = `https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/post/${postId}`;

  var config = {
    method: 'GET',
    url: getAllPostURL,
    headers: {
      Authorization: `Bearer ${value}`,
      'Content-Type': 'application/json',
    },
  };
  const res = await fetch(getAllPostURL, config)
    .then((response: any) => {
      return response;
    })
    .catch((error: any) => {
      console.error(error);
    });
  if (res!==undefined) {
    var data = await res.json();
  }
  return {
    props: {
      data: data,
    },
  };
}

{
  /* <div className={specificPostCss.videoContainer}>
              <div className={specificPostCss.videoContainer} id="video-container">
                <video className={specificPostCss.video} controls id="video" preload="metadata">
                  <source
                    src={
                      'https://static.videezy.com/system/resources/previews/000/019/696/original/pointing-blue.mp4'
                    }
                    type="video/mp4"
                  />
                </video>

                <div className={specificPostCss.playButtonWrapper}>
                <div title="Play video" className="play-gif" id="circle-play-b">
                  <svg
                    className={specificPostCss.svg}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 80 80"
                  >
                    <path d="M40 0a40 40 0 1040 40A40 40 0 0040 0zM26 61.56V18.44L64 40z" />
                  </svg>
                </div>
              </div>
              </div>
            </div> */
}

// <div style={{ display: 'flex' }}>
//             <div style={{ width: '30%' }}>
//               {' Created By :  '}
//               <div>
//                 <span>age : </span>
//                 {post?.createdBy?.age}
//               </div>
//               <div>
//                 <span>city : </span>
//                 {post?.createdBy?.city}
//               </div>
//               <div>
//                 <span>country : </span>
//                 {post?.createdBy?.country}
//               </div>
//               <div>
//                 <span>emailId : </span>
//                 {post?.createdBy?.emailId}
//               </div>
//               <div>
//                 <span>firstName : </span>
//                 {post?.createdBy?.firstName}
//               </div>
//               <div>
//                 <span>interests : </span>
//                 {post?.createdBy?.interests}
//               </div>
//               <div>
//                 <span>lastName : </span>
//                 {post?.createdBy?.lastName}
//               </div>
//               <div>
//                 <span>objectId : </span>
//                 {post?.createdBy?.objectId}
//               </div>
//               <div>
//                 <span>profession : </span>
//                 {post?.createdBy?.profession}
//               </div>
//               <div>
//                 <span>profilePictureUrl : </span>
//                 {post?.createdBy?.profilePictureUrl}
//               </div>
//               <div>
//                 <span>speciality : </span>
//                 {post?.createdBy?.speciality}
//               </div>
//               <div>
//                 <span>state : </span>
//                 {post?.createdBy?.state}
//               </div>
//             </div>
//             <div style={{ width: '70%' }}>
//               {'Post : Data '}
//               <div>
//                 <div>
//                   <span>CreatedOn : </span>
//                   {post?.createdOn}
//                 </div>
//                 <div>
//                   <span>description : </span>
//                   {post?.description}
//                 </div>
//                 <div>
//                   <span>id : </span>
//                   {post?.id}
//                 </div>
//                 <div>
//                   <span>isLikedByUser : </span>
//                   {post?.isLikedByUser}
//                 </div>
//                 <div>
//                   <span>mediaList : </span>
//                   {console.log(post?.mediaList)}
//                   {/* {post?.mediaList} */}
//                 </div>
//                 <div>
//                   <span>postType : </span>
//                   {post?.postType}
//                 </div>
//                 <div>
//                   <span>likeCount : </span>
//                   {post?.postMeasures?.likeCount}
//                 </div>
//                 <div>
//                   <span>commentCount : </span>
//                   {post?.postMeasures?.commentCount}
//                 </div>
//               </div>
//             </div>
//           </div>
