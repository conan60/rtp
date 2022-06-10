import { FC, useState } from 'react'
import { Button, Tooltip, Modal, DatePicker, Input } from 'antd'
import { injectIntl, IntlShape } from 'react-intl'
import { FileExcelOutlined, FileTextOutlined, AppstoreAddOutlined } from '@ant-design/icons'
import { Socket } from 'socket.io-client'
import Task from '../task'

import './style.scss'

const { TextArea } = Input

export interface TaskType {
  title: string;
  description: string;
  date: Date;
}

interface RoomProps {
  socket: Socket;
  intl: IntlShape;
  tasks?: TaskType[];
}

const Index: FC<RoomProps> = (props): JSX.Element => {
  const { 
    socket, 
    intl,
    tasks = [{title : 'Add backend service',date : new Date(),description : 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum '},{title : 'Add backend service',date : new Date(),description : 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum '},{title : 'Add backend service',date : new Date(),description : 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum '},{title : 'Add backend service',date : new Date(),description : 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum '},{title : 'Add backend service',date : new Date(),description : 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum '},{title : 'Add backend service',date : new Date(),description : 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum '},{title : 'Add backend service',date : new Date(),description : 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum '},{title : 'Add backend service',date : new Date(),description : 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum '},{title : 'Add backend service',date : new Date(),description : 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum '},] 
  } = props
  const [visible, setVisible] = useState(false)

  const handleOk = () => {
    setVisible(false)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  return (
    <div className='planner-content'>

      <Modal
        title={intl.formatMessage({ id: 'room.addPlan' })}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button shape='round' key="back" onClick={handleCancel}>
            {intl.formatMessage({ id: 'modal.cancel' })}
          </Button>,
          <Button shape='round' key="submit" type="primary" onClick={handleOk}>
            {intl.formatMessage({ id: 'modal.add' })}
          </Button>,
        ]}>
        <Input
          placeholder={intl.formatMessage({ id: 'modal.title' })}
          size='small'
        />
        <TextArea
          placeholder={intl.formatMessage({ id: 'modal.desc' })}
          autoSize={{ minRows: 2, maxRows: 5 }}
        />
        <DatePicker size='small' placeholder={intl.formatMessage({ id: 'modal.selectDate' })} onChange={() => null} />
      </Modal>


      <div className="top-planner">
        <div className='actions'>
          <Tooltip title={intl.formatMessage({ id: 'room.exportCsv' })}>
            <Button shape="circle" icon={<FileExcelOutlined />} type='primary' />
          </Tooltip>
          <Tooltip title={intl.formatMessage({ id: 'room.exportTxt' })}>
            <Button shape="circle" icon={<FileTextOutlined />} type='primary' />
          </Tooltip>
        </div>
      </div>
      <div className="bottom-planner">
        {tasks.map((el,index)=><Task key={index} {...el}/>)}
        <Tooltip className='add-plan' title={intl.formatMessage({ id: 'room.addPlan' })}>
          <Button onClick={() => setVisible(true)} shape="circle" icon={<AppstoreAddOutlined />} type='primary' size='large' />
        </Tooltip>
      </div>
    </div>
  )
}

export default injectIntl(Index)