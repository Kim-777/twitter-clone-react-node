import { Form, Input, Button } from 'antd';
import React, { useCallback, useEffect } from 'react'
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

function CommentForm({ post }) {


    const dispatch = useDispatch();

    
    const id = useSelector(({user}) => user.me?.id)
    const { addCommentDone, addCommentLoading } = useSelector(({post}) => post);
    const [commentText, onChangeCommentText, setComment] = useInput('')
    
    useEffect(() => {
        if(addCommentDone) {
            setComment('')
        }
    }, [addCommentDone])


    const onSubmitComment = useCallback(() => {
        console.log(post.id, commentText);

        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: { content: commentText, postId: post.id, userId: id}
        });

    }, [commentText, id]);

    return (
        <Form onFinish={onSubmitComment}>
            <Form.Item style={{ position: 'relative', margin: 0}}>
                <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
                <Button 
                    style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 1 }}
                    type="primary" 
                    htmlType="submit"
                    loading={addCommentLoading}
                >
                    삐약
                </Button>
            </Form.Item>
        </Form>
    )
}

CommentForm.propTypes = {
    post: PropTypes.object.isRequired
}

export default CommentForm
