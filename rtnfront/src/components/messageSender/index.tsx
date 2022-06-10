import React, { FC } from 'react'
import { Button, Input } from 'antd'
import { SendOutlined, FileAddOutlined } from '@ant-design/icons'
import { injectIntl, IntlShape } from 'react-intl'
import { Socket } from 'socket.io-client'

import './style.scss'

const { TextArea } = Input;

interface RoomProps {
    socket : Socket,
    intl : IntlShape
}

const Index : FC<RoomProps> = (props) : JSX.Element =>{
  const {socket,intl} = props
  return (
    <div className='message-sender-content'>
      <Button shape="circle" icon={<FileAddOutlined />} />
      <TextArea
        placeholder={intl.formatMessage({ id: 'room.message.sender' })}
        autoSize={{ minRows: 2, maxRows: 3 }}
      />
      <Button shape="circle" icon={<SendOutlined />} type='primary' />
    </div>
  )
}

export default injectIntl(Index)