import React, { FC, useState } from 'react'
import { Button, Input } from 'antd'
import { SendOutlined, FileAddOutlined } from '@ant-design/icons'
import { injectIntl, IntlShape } from 'react-intl'
import { Socket } from 'socket.io-client'
import { useSelector } from 'react-redux'
import { roomSelector } from '../../redux/selectors/roomSelector'
import constants from '../../constants'

import './style.scss'

const { TextArea } = Input;

interface RoomProps {
    socket : Socket,
    intl : IntlShape
}

const Index : FC<RoomProps> = (props) : JSX.Element =>{
  const {socket,intl} = props
  const room = useSelector(roomSelector)
  const [message, setMessages] = useState<string>('')
  const sendMessage = ()=>{
    socket.emit(constants.SEND_MESSAGE,{message,room : room[0].room})
  }
  const changeHandler = (e : React.ChangeEvent<HTMLTextAreaElement>)=>{
    setMessages(e.target.value)
  }
  return (
    <div className='message-sender-content'>
      <Button shape="circle" icon={<FileAddOutlined />} />
      <TextArea
        onChange={changeHandler}
        placeholder={intl.formatMessage({ id: 'room.message.sender' })}
        autoSize={{ minRows: 2, maxRows: 3 }}
        value={message}
      />
      <Button onClick={sendMessage} shape="circle" icon={<SendOutlined />} type='primary' />
    </div>
  )
}

export default injectIntl(Index)