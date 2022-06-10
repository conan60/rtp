import { FC } from 'react'
import { Tooltip, Button } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { injectIntl, IntlShape } from 'react-intl'
import { TaskType } from '../planner'


import './style.scss'


interface TaskProps extends TaskType {
    intl: IntlShape
}


const Index: FC<TaskProps> = (props): JSX.Element => {
    const { title, description, date, intl } = props
    return (
        <div className='task'>
            <div className="task-resume">
                <div className="title-date">
                    <p className='title'>{title}</p>
                    <p className='date'>{date.toDateString()}</p>
                </div>
                <div className="desc">
                    <p>"{description.slice(50)}..."</p>
                </div>
            </div>
            <div className="task-actions">
                <Tooltip title={intl.formatMessage({ id: 'room.delete' })}>
                    <Button shape="circle" icon={<DeleteOutlined />} danger />
                </Tooltip>
                <Tooltip title={intl.formatMessage({ id: 'room.modif' })}>
                    <Button shape="circle" icon={<EditOutlined />} />
                </Tooltip>
            </div>
        </div>
    )
}

export default injectIntl(Index)