/*
 * @Description: 
 * @Author:  
 * @Date: 2022-05-10 11:14:29
 * @LastEditTime: 2022-05-23 14:09:09
 * @LastEditors:  
 */
import Loadable from 'react-loadable'
import Hold from './Hold'
export default function LoadPage(loader, loading = Hold, delay = 3000) {
    return Loadable({
        loader,
        loading,
        delay
    });
}