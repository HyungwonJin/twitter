import React from 'react'
import Link from 'next/link';
import PropTypes from 'prop-types';

const PostCardContent = ({ postData }) => {
    return (
        <div>
            {postData.split(/(#[^\s#]+)/g).map((v, i) => {
                if (v.match(/(#[^\s#]+)/)) {
                    return <Link href={`/hashtag/${v.slice(1)}`} key={i}><a>{v}</a></Link>
                    // /hashtag/${v.slice(1)}는 글자 첫번째인 #을 떼는 기능
                }
                return v;
            })}
        </div>
    )
}

PostCardContent.propTypes = {
    postData: PropTypes.string.isRequired,
}

export default PostCardContent
