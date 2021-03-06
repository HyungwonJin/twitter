import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { END } from 'redux-saga';
import axios from 'axios';
import AppLayout from "../components/AppLayout";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';


const Home = () => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { mainPosts, hasMorePost, loadPostsLoading, retweetError } = useSelector((state) => state.post);

    useEffect(() => {
        if (retweetError) {
            alert(retweetError)
        }
    }, [retweetError])

    useEffect(() => {
        function onScroll() {
            // console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
            // scrollY: 얼마나 내렸는지, clientHeight: 화면 보이는 길이, scrollHeight: 총 길이
            if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                if (hasMorePost && !loadPostsLoading) {
                    const lastId = mainPosts[mainPosts.length - 1]?.id;
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                        lastId,
                    });
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll); // removeEventListener해주지 않으면 메모리에 쌓여서 없애주어여함
        }
    }, [hasMorePost, loadPostsLoading, mainPosts])

    return (
        <AppLayout>
            {me && <PostForm />}
            {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
        </AppLayout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => { // 이 코드가 있으면 서버 쪽에서 SSR을 함
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (req && cookie) { // 내 로그인 정보가 다른 사람에게 공유될 가능성을 배제시킴
        axios.defaults.headers.Cookie = cookie;
    }
    store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });
    store.dispatch({
        type: LOAD_POSTS_REQUEST,
    });
    store.dispatch(END);
    await store.sagaTask.toPromise();
})

export default Home;