import { FC, useState } from "react";
import { Button, Tooltip, Modal, DatePicker, Input, DatePickerProps } from "antd";
import { injectIntl, IntlShape } from "react-intl";
import { Moment } from "moment";
import {
  FileExcelOutlined,
  FileTextOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import { Socket } from "socket.io-client";
import { useSelector } from 'react-redux'
import { roomSelector } from '../../redux/selectors/roomSelector'
import { taskSelector } from '../../redux/selectors/taskSelector'
import constants from '../../constants'
import Task from "../task";

import "./style.scss";


const { TextArea } = Input;

export interface TaskType {
  title: string;
  description: string;
  date: Date | Moment | null;
}

type TaskKey = keyof TaskType

interface RoomProps {
  socket: Socket;
  intl: IntlShape;
}

const Index: FC<RoomProps> = (props): JSX.Element => {
  const {
    socket,
    intl,
  } = props;
  const room = useSelector(roomSelector)
  const tasks = useSelector(taskSelector)
  const [task,setTask] = useState<TaskType>({title : '', description : '',date : null})
  const [visible, setVisible] = useState(false);

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob(tasks.map(el=>`${el.title}\t${new Date(el.date!.toString()).toDateString()}\n${el.description}\n`), {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element);
    element.click();
  };

  const downloadCsvFile = () => {
    const element = document.createElement("a");
    const file = new Blob(['Title,Date,Description\n',...tasks.map(el=>`${el.title};${new Date(el.date!.toString()).toDateString()};${el.description}\n`)], {
      type: "text/csv"
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.csv";
    document.body.appendChild(element);
    element.click();
  };


  const handleOk = () => {
    socket.emit(constants.SEND_TASK,{...task,room : room[0].room})
    setVisible(false);
    setTask({title : '', description : '',date : null})
  };

  const handleCancel = () => {
    setVisible(false);
    setTask({title : '', description : '',date : null})
  };

  const changeHandler  = (name : TaskKey)=>(event : React.ChangeEvent<HTMLTextAreaElement|HTMLInputElement>)=>{
    setTask({...task,[name] : event.target.value})
  }

  const changeDateHandler : DatePickerProps['onChange'] = (date)=>{
    setTask({...task,date })
  }

  return (
    <div className="planner-content">
      <Modal
        title={intl.formatMessage({ id: "room.addPlan" })}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button shape="round" key="back" onClick={handleCancel}>
            {intl.formatMessage({ id: "modal.cancel" })}
          </Button>,
          <Button shape="round" key="submit" type="primary" onClick={handleOk}>
            {intl.formatMessage({ id: "modal.add" })}
          </Button>,
        ]}
      >
        <Input
          value={task.title}
          onChange={changeHandler("title")}
          placeholder={intl.formatMessage({ id: "modal.title" })}
          size="small"
        />
        <TextArea
        value={task.description}
          onChange={changeHandler("description")}
          placeholder={intl.formatMessage({ id: "modal.desc" })}
          autoSize={{ minRows: 2, maxRows: 5 }}
        />
        <DatePicker
          size="small"
          placeholder={intl.formatMessage({ id: "modal.selectDate" })}
          onChange={changeDateHandler}
        />
      </Modal>

      <div className="top-planner">
        <div className="actions">
          <Tooltip title={intl.formatMessage({ id: "room.exportCsv" })}>
            <Button
              shape="circle"
              icon={<FileExcelOutlined />}
              type="primary"
              onClick={downloadCsvFile}
            />
          </Tooltip>
          <Tooltip title={intl.formatMessage({ id: "room.exportTxt" })}>
            <Button shape="circle" icon={<FileTextOutlined />} type="primary" onClick={downloadTxtFile}/>
          </Tooltip>
        </div>
      </div>
      <div className="bottom-planner">
        {tasks.map((el, index) => (
          <Task key={index} {...el} />
        ))}
        <Tooltip
          className="add-plan"
          title={intl.formatMessage({ id: "room.addPlan" })}
        >
          <Button
            onClick={() => setVisible(true)}
            shape="circle"
            icon={<AppstoreAddOutlined />}
            type="primary"
            size="large"
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default injectIntl(Index);
