import  { FC } from 'react'
import { Tooltip, Avatar } from 'antd'
import { MessageProps } from '../messages'
import './style.scss'




const Index: FC<MessageProps> = (props): JSX.Element => {
    const { type, name, message, date } = props
    const timeArray = new Date(date).toTimeString().split(':')
    const time = `${timeArray[0]}:${timeArray[1]}`
    return (
        <div className={`msg ${type} message-content`}>
            {type === 'received' && <Avatar className='avatar'>{name[0].toUpperCase()}</Avatar>}
            <Tooltip title={time}>
                <p className={`msg-content ${type}`}>{message}</p>
            </Tooltip>
        </div>
    )
}

export default Index