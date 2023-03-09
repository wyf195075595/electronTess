/*
 * @Description: 
 * @Author:  
 * @Date: 2022-05-10 11:14:13
 * @LastEditTime: 2022-05-10 11:54:33
 * @LastEditors:  
 */
import React from 'react'
import { Spin } from 'antd'

export default function Hold (props) {
     return (
          <div style={{ paddingTop: 200, width: "100%", height: "100%", background: '#fff', textAlign: 'center' }}>
               <Spin />
          </div>
     );
}