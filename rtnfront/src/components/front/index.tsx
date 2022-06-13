import React, { FC, useState } from 'react'
import { Socket } from 'socket.io-client'
import { Form, Checkbox, Button, Input } from 'antd'
import ReactFlagsSelect from 'react-flags-select'
import { injectIntl,IntlShape } from 'react-intl'
import { useDispatch } from 'react-redux'
import { setMe } from '../../redux/slices/roomSlice'
import constants from '../../constants'

import './style.scss'

interface FrontProps {
    socket: Socket;
    setLang: (lang: string) => void;
    language: string;
    intl : IntlShape
}

interface DataConnection {
    type : string;
    username : string;
    roomid : string;
}

const Index: FC<FrontProps > = (props: FrontProps): JSX.Element => {
    const dispatch = useDispatch()
    const { setLang, socket, language, intl } = props
    const [checked, setChecked] = useState<boolean>(false)
    const onSubmit = (data : DataConnection) : void=>{
        dispatch(setMe(data.username))
        if( data.roomid){
            socket.emit(constants.JOIN_ROOM, {
                name: data.username,
                roomid : data.roomid
              });
        }else{
            socket.emit(constants.CREATE_ROOM, {
                name: data.username,
              });
        }
        
    }

    return (
        <div className='front'>
            <div className='content'>
                <img className='logo' alt='logo' src='/transparent-logo.png' />
                <Form
                    name='basic'
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={(value) => onSubmit(value)}
                >
                    {!checked ? (
                        <div>
                            <Form.Item
                                name='username'
                                // {...userError}
                                rules={[
                                    {
                                        required: true,
                                        message: intl.formatMessage({ id: 'front.enterUserName' }),
                                    },
                                ]}
                            >
                                <Input
                                    placeholder={intl.formatMessage({ id: 'front.username' })}
                                    size='small'
                                />
                            </Form.Item>
                            <Form.Item
                                name='roomid'
                                // {...roomError}
                                rules={[
                                    {
                                        required: true,
                                        message: intl.formatMessage({ id: 'front.enterRoomNumber' }),
                                    },
                                ]}
                            >
                                <Input
                                    placeholder={intl.formatMessage({ id: 'front.roomNumber' })}
                                    size='small'
                                />
                            </Form.Item>
                            {/* Langage selector */}
                            <Form.Item name='language' className='input-lang'>
                                <ReactFlagsSelect
                                    selected={language}
                                    onSelect={(code) => setLang(code)}
                                    selectedSize={11}
                                    optionsSize={11}
                                    countries={['US', 'FR']}
                                    customLabels={{ US: 'English', FR: 'Français' }}
                                    placeholder={intl.formatMessage({
                                        id: 'front.pickLanguage',
                                    })}
                                />
                            </Form.Item>
                        </div>
                    ) : (
                        <div>
                            <Form.Item
                                name='username'
                                // {...userError}
                                rules={[
                                    {
                                        required: true,
                                        message: intl.formatMessage({ id: 'front.enterUserName' }),
                                    },
                                ]}
                                className='w-100'
                            >
                                <Input
                                    placeholder={intl.formatMessage({ id: 'front.username' })}
                                    size='small'
                                />
                            </Form.Item>
                            {/* Langage selector */}
                            <Form.Item name='language' className='input-lang'>
                                <ReactFlagsSelect
                                    selected={language}
                                    onSelect={(code) => setLang(code)}
                                    selectedSize={11}
                                    optionsSize={11}
                                    countries={['US', 'FR']}
                                    customLabels={{ US: 'English', FR: 'Français' }}
                                    placeholder={intl.formatMessage({
                                        id: 'front.pickLanguage',
                                    })}
                                />
                            </Form.Item>
                        </div>
                    )}
                    <Form.Item name='roomid' className='check-box'>
                        <Checkbox  checked={checked} onChange={(event)=>setChecked(event.target.checked)}>
                            {intl.formatMessage({ id: 'front.createNewRoom' })}
                        </Checkbox>
                    </Form.Item>
                    <Form.Item className='submit-button'>
                        <Button type='primary' htmlType='submit' size='small' shape="round">
                            {checked
                                ? intl.formatMessage({ id: 'front.createRoom' })
                                : intl.formatMessage({ id: 'front.joinRoom' })}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default injectIntl(Index)