import React, { FC } from 'react'
import { Button, Tooltip } from 'antd'
import { VideoCameraOutlined, PhoneOutlined, TeamOutlined } from '@ant-design/icons'
import { injectIntl, IntlShape } from 'react-intl'
import { Socket } from 'socket.io-client'
import { useSelector } from 'react-redux'
import { roomSelector,userSelector } from '../../redux/selectors/roomSelector'
import { messageSelector } from '../../redux/selectors/messageSelector'
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
  messages?: MessageProps[]
}



const Index: FC<RoomProps> = (props): JSX.Element => {
  const date : Date = new Date()
  const {
    socket,
    intl,
  } = props
  const room = useSelector(roomSelector)
  const me = useSelector(userSelector)
  const messages = useSelector(messageSelector)
  const messagesRender = messages.map((el,index)=><Messge key={el.date.toString() as string} {...el} type={el.name===me?'sent': 'received'}/>)
return (
  <div className='messages-content'>
    <div className='top-messages'>
      <p className='actual-user'>{intl.formatMessage({ id: 'room.room' })} : {room[0].room}</p>
      <div className='actions'>
        <Button shape="circle" icon={<VideoCameraOutlined />} type='primary' />
        <Button shape="circle" icon={<PhoneOutlined />} type='primary' />
        <Tooltip title={room.filter(el=>el.name!==me).map(el => <p>{el.name}</p>)}>
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