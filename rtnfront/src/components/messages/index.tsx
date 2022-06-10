import React, { FC } from 'react'
import { Button, Tooltip } from 'antd'
import { VideoCameraOutlined, PhoneOutlined, TeamOutlined } from '@ant-design/icons'
import { injectIntl, IntlShape } from 'react-intl'
import { Socket } from 'socket.io-client'
import Messge from '../message'

import './style.scss'

export interface MessageProps {
  name: string;
  message: string;
  date: Date;
  type: 'sent' | 'received';
}

interface RoomProps {
  socket: Socket;
  intl: IntlShape;
  users?: string[];
  actualUser?: string;
  messages?: MessageProps[]
}



const Index: FC<RoomProps> = (props): JSX.Element => {
  const date : Date = new Date()
  const {
    socket,
    intl,
    users = ['Malek', 'Mohamed', 'Gorchene'],
    actualUser = 'Camille',
    messages = [{ date, name : 'Malek', type : 'sent',message : 'Hello Hello Hello Hello Hello Hello Hello HelloHello Hello Hello HelloHello Hello Hello Hello Hello Hello Hello HelloHello Hello Hello HelloHello Hello Hello HelloHello Hello Hello HelloHello Hello Hello Hello'},{ date, name : 'Malek', type : 'received',message : 'Hello'},{ date, name : 'Malek', type : 'received',message : 'Hello'},{ date, name : 'Malek', type : 'received',message : 'Hello'},{ date, name : 'Malek', type : 'received',message : 'Hello Hello Hello Hello Hello Hello Hello HelloHello Hello Hello HelloHello Hello Hello Hello Hello Hello Hello HelloHello Hello Hello HelloHello Hello Hello HelloHello Hello Hello HelloHello Hello Hello Hello'},{ date, name : 'Malek', type : 'received',message : 'Hello Hello Hello Hello Hello Hello Hello HelloHello Hello Hello HelloHello Hello Hello Hello Hello Hello Hello HelloHello Hello Hello HelloHello Hello Hello HelloHello Hello Hello HelloHello Hello Hello Hello'},{ date, name : 'Malek', type : 'received',message : 'Hello Hello Hello Hello Hello Hello Hello HelloHello Hello Hello HelloHello Hello Hello Hello Hello Hello Hello HelloHello Hello Hello HelloHello Hello Hello HelloHello Hello Hello HelloHello Hello Hello Hello'},{ date, name : 'Malek', type : 'received',message : 'Hello'},{ date, name : 'Malek', type : 'sent',message : 'Hello'},{ date, name : 'Malek', type : 'received',message : 'Hello'},{ date, name : 'Malek', type : 'received',message : 'Hello'},{ date, name : 'Malek', type : 'sent',message : 'Hello'}]
  } = props
  const messagesRender = messages.map((el,index)=><Messge key={index} {...el}/>)
return (
  <div className='messages-content'>
    <div className='top-messages'>
      <p className='actual-user'>{actualUser}</p>
      <div className='actions'>
        <Button shape="circle" icon={<VideoCameraOutlined />} type='primary' />
        <Button shape="circle" icon={<PhoneOutlined />} type='primary' />
        <Tooltip title={users.map(el => <p>{el}</p>)}>
          <Button shape="circle" icon={<TeamOutlined />} />
        </Tooltip>
      </div>
    </div>
    <div className='bottom-messages'>
      {messagesRender}
    </div>
  </div>
)
}

export default injectIntl(Index)