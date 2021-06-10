import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import { useSelector} from 'react-redux';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';


const Home = () => {

    const { me } = useSelector(({user}) => user);
    const { mainPosts } = useSelector(({post}) => post);

    return (
        <>
            <Head>
                <title>chaty</title>
            </Head>
            <AppLayout>
                {me && <PostForm />}
                {mainPosts.map(post => <PostCard key={post.id} post={post}/>) }
            </AppLayout>
        </>
    )
}

export default Home;