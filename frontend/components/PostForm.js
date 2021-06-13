import { Button, Form, Input } from 'antd';
import React, { useCallback, useRef, useEffect } from 'react';
// import useInput from '../hooks/useInput';
import { useSelector, useDispatch } from 'react-redux';
import { 
    addPostRequestAction,
    UPLOAD_IMAGES_REQUEST,
} from '../reducers/post';
import useInput from '../hooks/useInput';

const PostForm = () => {

    const imageInput = useRef();
    const dispatch = useDispatch();
    const { imagePaths, addPostDone } = useSelector(({post}) => post)
    const [text, onChangeText, setText] = useInput('');
    
    useEffect(() => {
        // console.log('addPostDone', addPostDone)
        if(addPostDone) {
            setText('');
        }
    }, [addPostDone]);

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current])

    const onSubmit = useCallback(() => {
        dispatch(addPostRequestAction(text));
    }, [text]);

    const onChangeImages = useCallback((e) => {
        console.log('images', e.target.files);
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f);
        });
        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData
        })
    });

    return (
        <Form style={{ margin: '10px 0 20px'}} encType="multipart/form-data" onFinish={onSubmit}>
            <Input.TextArea 
                value={text}
                onChange={onChangeText}
                maxLength={140}
                placeholder="어떤 신기한 일이 있었나요?"
            />
            <div>
                <input 
                    type="file" 
                    name="image" 
                    multiple 
                    hidden 
                    ref={imageInput}
                    onChange={onChangeImages}
                />
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button type="primary" style={{ float: 'right'}} htmlType="submit">짹짹</Button>
            </div>
            <div>
                {imagePaths.map(v => (
                    <div key={v} style={{ display: 'inline-block'}}>
                        <img src={`http://localhost:3065/${v}`} style={{ width: '200px'}} alt={v} />
                        <div>
                            <Button>제거</Button>
                        </div>
                    </div>
                ))}
            </div>
        </Form>
    )
};

export default PostForm;
