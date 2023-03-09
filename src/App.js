/*
 * @Description: 
 * @Author:  
 * @Date: 2022-05-10 10:10:03
 * @LastEditTime: 2022-06-15 09:08:11
 * @LastEditors:  
 */
import '@/app.scss'
import {HashRouter} from 'react-router-dom'
import RoutePage from './routes/RoutePage'
function App() {
  return (
    <HashRouter>
      {/* <Routes> */}
        <RoutePage />
      {/* </Routes> */}
    </HashRouter>
  );
}

export default App;
