import React from 'react';
import { useRouter } from 'next/router';
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_POST_REQUEST } from '../../reducers/post';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import { useSelector } from 'react-redux';
import Head from 'next/head';

const Post = () => {
    const { singlePost } = useSelector(({ post }) => post )
    const router = useRouter();
    const { id } = router.query;

    return (
        <AppLayout>
            {singlePost ? (
                <>
                    <Head>
                        <title>
                            {singlePost.User.nickname} 님의 글
                        </title>
                        <meta name="description" content={singlePost.content} />
                        <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
                        <meta property="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : 'http://localhost:3060/fovicon.png'} />
                    </Head>
                    <PostCard post={singlePost} />
                </>
            ) : (
                <div>찾는 글이 존재하지 않습니다.</div>
            )}
        </AppLayout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if(context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
            type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
        type: LOAD_POST_REQUEST,
        data: context.params.id,
    })
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default Post;
