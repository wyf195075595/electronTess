/*
 * @Description: 
 * @Author:  
 * @Date: 2022-05-10 11:04:59
 * @LastEditTime: 2022-06-14 18:07:50
 * @LastEditors:  
 */
import React, {Component} from 'react'
import { Card, Space } from 'antd';
const {readFileDir, screenShot, openWindow} = window.api
export default class Main extends Component {

    render() {
        const cardStyle = {
            width: 400,
        }
        // 获取文件目录
        const getFileDirs = (e, rs)=> {
            console.log('getFileDirs:', rs);
        }
        // 获取截图资源
        const getScreenShotSource = (e, rs)=> {
            window.test = rs
            console.log('getScreenShotSource:', rs);
        }
        let cards = [
            {
                click: ()=> openWindow(window.location.href),
                title: '新窗口',
                content: '打开新窗口'
            },
            {
                click: ()=> screenShot(getScreenShotSource),
                title: '截屏',
                content: 'electron 截屏.写入剪切板不能 ctrl+v 。只能读取剪切板内容 readImage'
            },
            {
                click: ()=> readFileDir(getFileDirs),
                title: '打开目录对话框并遍历里面所有文件',
                content: '打开新窗口'
            },
            {
                click: ()=> React.$goto('/mediaVideo'),
                title: '取用户的音视频流',
                content: '获取摄像头'
            },
            {
                click: ()=> React.$goto('/ocrDemo'),
                title: 'OCR',
                content: '图片转成文字'
            },
        ]
        
        return (
            <Space
                direction="horizontal"
                wrap
                size="middle"
                style={{
                    display: 'flex',
                    justifyContent: 'space-around'
                }}
            >
                {
                    cards.map((item, index) => {
                        return <Card 
                            key={index}
                            title={item.title}
                            style={{...cardStyle}}
                            onClick={item.click}
                        >
                            {item.content}
                        </Card>
                    })
                }
                
            </Space>
        )
    }
}
