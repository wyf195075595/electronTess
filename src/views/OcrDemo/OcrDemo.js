/*
 * @Description: 
 * @Author:  
 * @Date: 2022-05-23 14:09:33
 * @LastEditTime: 2022-06-16 11:42:19
 * @LastEditors:  
 */
import React, { useEffect, useState } from 'react';
import './OcrDemo.scss';
import {fileToBase64} from '@/util/util'
import { Input, Button, Progress } from 'antd';
const { TextArea } = Input;
function OcrDemo() {
    const [imagePath, setImagePath] = useState("");
    const [text, setText] = useState("");
    const [progress, setProgress] = useState(0);
    const worker = window.api.getWorker({
      logger: getProgress
    })

    // 选中图片时将图片转为base64
    const handleChange = (event) => {
      fileToBase64(event.target.files[0], function(base64) {
        setImagePath(base64)
        setProgress(0)
      })
      // setImagePath(URL.createObjectURL(event.target.files[0]));
    }
    const handleClick =  () => {
      readPicTotext((data)=> {
        setText(data)
      })
    }
    function getProgress(data) {
      if(data.jobId) {
        setProgress(data.progress*100)
      }
      console.log('getProgress:', data);
    }
    async function readPicTotext(config={}, callback) {
      console.log();
      if(arguments.length==1) {
        callback = config
      }
      await worker.load();
      await worker.loadLanguage('chisim+eng');
      await worker.initialize('chisim');
      const { data: { text } } = await worker.recognize(imagePath);
      callback(text)
      await worker.terminate();
    }
    return (
      <div className="container">
        <main className="content">
          <h3>Actual image uploaded</h3>
          <img  src={imagePath} className="App-logo" alt="logo"/>
          <h3>Extracted text</h3>
          <Progress percent={progress} />
          <TextArea rows={6} placeholder="maxLength is 6" value={text} />
          <Input type="file" capture="user" onChange={handleChange} placeholder="选择图片" />
          <Button onClick={handleClick} type="primary">转文字</Button>
        </main>
      </div>
    );
  
}

export default OcrDemo;