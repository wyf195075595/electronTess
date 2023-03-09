/*
 * @Description: 
 * @Author:  
 * @Date: 2022-05-23 14:09:33
 * @LastEditTime: 2022-05-24 17:36:09
 * @LastEditors:  
 */
import React, {Component} from 'react'
import { Button } from 'antd';
export default class MediaVideo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            MediaStreamTrack: null,
            isPhotograph: true
        }
    }
    clearCanvas() {
        var c = document.getElementById("canvas");
        var cxt = c.getContext("2d");
        cxt.clearRect(0, 0, c.width, c.height)
        c.height = c.height;
    }
    
    // 音视频测试
    async getMedia() {
        let option = {
            audio: true,
            video: {width: 360, height: 360}
        };
        let MediaStream = await navigator.mediaDevices.getUserMedia(option)
        let mst = typeof MediaStream.stop === 'function'? MediaStream:MediaStream.getTracks()[1];
        this.setState({
            MediaStreamTrack: mst,
            isPhotograph: false
        })
        let video = document.getElementById("my-video")
        video.srcObject = MediaStream;

        video.onloadedmetadata = (e)=> {
            video.play();
        };
    }
    componentDidMount() {
        this.getMedia()
    }
    componentWillUnmount() {
        // this.state.video.onloadedmetadata = null
    }
    render() {
        
        //拍照
        const takePhoto = ()=> {
            //获得Canvas对象
            let video = document.getElementById("my-video");
            let canvas = document.getElementById("canvas");
            let ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0,360, 360);
            let imgData = document.getElementById("canvas").toDataURL("image/jpeg");
        }
        return (
            <div>

                <Button type='primary' onClick={()=> {
                    takePhoto()
                }}>拍照</Button>
                <Button type='primary' onClick={()=> {
                    this.state.MediaStreamTrack.stop()
                    React.$goto('/')
                }}>返回首页</Button>
                <video id='my-video' width={360} height={360} className='my-video' autoPlay></video>
                <canvas id='canvas' width={360} height={360}  ></canvas>
            </div>
        )
    }
}