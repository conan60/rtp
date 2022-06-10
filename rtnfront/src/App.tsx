import { useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import Front from './components/front'
import Room from './components/room'
import fr from './i18n/fr.json'
import en from './i18n/en.json'

import "antd/dist/antd.css";

interface Languages {
  [lang : string]: Record<string, string>|undefined
}

const socket : Socket = io("http://localhost:3030/");
const LANG : Languages = { FR: fr as Record<string, string>, EN: en as Record<string, string> }

const App = ()=> {
  const [lang,setLang] = useState<string>('US')
  const [logged,setLogged] = useState<boolean>(false)
  return (
    <Provider store={store}>
      <IntlProvider locale={navigator.language} messages={LANG[lang==='US'?'EN':'FR']}>
          {
            logged?
            <Room socket={socket}/>
            :
            <Front language={lang} setLang={setLang} setLogged={setLogged} socket={socket}/>
          }
      </IntlProvider>
    </Provider>
  );
}

export default App;
