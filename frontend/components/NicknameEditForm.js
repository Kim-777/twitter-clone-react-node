import React, { useMemo, useCallback } from 'react';
import { Form, Input } from 'antd';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';

const NicknameEditForm = () => {

    const dispatch = useDispatch();
    const { me } = useSelector(({ user }) => user)

    const style = useMemo(() => ({marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px'}), []);

    const [nickname, onChangeNickname] = useInput(me?.nickname || '');

    const onSubmit = useCallback(() => {
        dispatch({
            type: CHANGE_NICKNAME_REQUEST,
            data: nickname,
        })
    }, [nickname])

    return (
        <Form 
            style={style}
        >
            <Input.Search 
                value={nickname}
                onChange={onChangeNickname}
                addonBefore="닉네임" 
                enterButton="수정" 
                onSearch={onSubmit}
            />
        </Form>
    )
};

export default NicknameEditForm;
