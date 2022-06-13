import { useState, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { IntlProvider } from 'react-intl'
import Front from './components/front'
import Room from './components/room'
import fr from './i18n/fr.json'
import en from './i18n/en.json'
import listeners from './listeners'
import { roomSelector } from './redux/selectors/roomSelector'


import "antd/dist/antd.css";

interface Languages {
  [lang : string]: Record<string, string>|undefined
}

const socket : Socket = io("http://localhost:3030/");
const LANG : Languages = { FR: fr as Record<string, string>, EN: en as Record<string, string> }

const App = ()=> {
  const room = useSelector(roomSelector)
  const dispatch = useDispatch()
  const [lang,setLang] = useState<string>('US')
  

  useEffect(()=>{listeners(socket,dispatch).map(fn=>fn())  },[])
  return (
    
      <IntlProvider locale={navigator.language} messages={LANG[lang==='US'?'EN':'FR']}>
          {
            room.length?
            <Room socket={socket}/>
            :
            <Front language={lang} setLang={setLang} socket={socket}/>
          }
      </IntlProvider>
    
  );
}

export default App;
