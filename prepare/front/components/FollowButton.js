import React, { useCallback } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

const FollowButton = ({ post }) => {
    const dispatch = useDispatch();
    const { me, followLoading, unfollowLoading } = useSelector((state) => state.user);
    // 내 정보와 loading 상태를 불러옴
    const isFollowing = me?.Followings.find((v) => v.id === post.User.id);
    // me?.Followings => me && me.Followings
    // 내 팔로우 목록에 있는지 확인
    const onClickButton = useCallback(() => {
        if (isFollowing) { // 목록에 있다면 언팔로우
            dispatch({
                type: UNFOLLOW_REQUEST,
                data: post.User.id,
            })
        } else { // 없다면 팔로우
            dispatch({
                type: FOLLOW_REQUEST,
                data: post.User.id,
            })
        }

    }, [isFollowing])

    if (post.User.id === me.id) {
        return null;
    } // 게시글 작성자와 현재 로그인 id가 같으면 null 반환 -> 아무것도 안나타남

    return (
        <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
            {isFollowing ? '언팔로우' : '팔로우'}
        </Button>
    )
};

FollowButton.propTypes = {
    post: PropTypes.object.isRequired,
};

export default FollowButton;