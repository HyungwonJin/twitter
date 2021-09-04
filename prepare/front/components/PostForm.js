import React, { useCallback, useRef, useEffect } from "react";
import { Form, Button, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import useinput from "../hooks/useinput";

import { addPost, UPLOAD_IMAGES_REQUEST } from "../reducers/post";

const PostForm = () => {
    const { imagePaths, addPostDone } = useSelector((state) => state.post);
    const dispatch = useDispatch();
    const [text, onChangeText, setText] = useinput('');

    useEffect(() => {
        if (addPostDone) {
            setText('');
        }
    }, [addPostDone])

    const onSubmit = useCallback(() => {
        dispatch(addPost(text));
    }, [text]);

    const imageInput = useRef();
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    const onChangeImages = useCallback((e) => {
        console.log('image', e.target.files);
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f); // 아래의 input에서 name을 image라고 지정해주지 않으면 인식 못함
        });
        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData,
        })
    }, [])


    return (
        <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
            <Input.TextArea
                value={text}
                onChange={onChangeText}
                maxLength={140}
                placeholder="어떤 신기한 일이 있었나요?"
            />
            <div>
                <input type="file" name="image" key={imagePaths.join()} multiple hidden ref={imageInput} onChange={onChangeImages} />
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button type="primary" style={{ float: "right" }} htmlType="submit">짹짹</Button>
            </div>
            <div>
                {imagePaths.map((v) => (
                    <div key={v} style={{ display: "inline-block " }}>
                        <img src={v} style={{ width: '200px ' }} alt={v} />
                        <div>
                            <Button>제거</Button>
                        </div>
                    </div>
                ))}
            </div>

        </Form>
    )
}

export default PostForm;