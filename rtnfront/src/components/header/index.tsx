import React, { FC } from 'react'
import { injectIntl, IntlShape } from 'react-intl'
import { Tooltip, Button } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { Socket } from 'socket.io-client'

import './style.scss'


interface RoomProps {
  socket: Socket,
  intl: IntlShape
}

const Index: FC<RoomProps> = (props): JSX.Element => {
  const { socket, intl } = props
  return (
    <div className='header-content'>
      <img src='/transparent-logo.png' />
      <Tooltip title={intl.formatMessage({ id: 'room.logout' })}>
        <Button shape="circle" icon={<LogoutOutlined />} danger/>
      </Tooltip>

    </div>
  )
}

export default injectIntl(Index)