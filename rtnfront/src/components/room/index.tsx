import React, { FC } from 'react'
import { injectIntl, IntlShape } from 'react-intl'
import { Socket } from 'socket.io-client'
import Header from '../header'
import MessageSender from '../messageSender'
import Messages from '../messages'
import Planner from '../planner'

import './style.scss'


interface RoomProps {
  socket: Socket,
  intl: IntlShape
}

const Index: FC<RoomProps> = (props): JSX.Element => {
  const { socket, intl } = props
  return (
    <div className='room'>
      <div className='header'>
        <Header socket={socket}/>
      </div>
      <div className='bottom'>
        <div className='message-container'>
          <div className='messages'>
            <Messages socket={socket}/>
          </div>
          <div className='message-sender'>
            <MessageSender socket={socket}/>
          </div>
        </div>
        <div className='planner'>
          <Planner socket={socket}/>
        </div>
      </div>
    </div>
  )
}

export default injectIntl(Index)