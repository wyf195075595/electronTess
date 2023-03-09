/*
 * @Description: 
 * @Author:  
 * @Date: 2022-05-10 11:16:19
 * @LastEditTime: 2022-06-15 08:17:54
 * @LastEditors:  
 */
import React from 'react';
import {
    Route, Routes
} from 'react-router-dom';
import LoadPage from '../util/LoadPage';

const MainPage = LoadPage(() => import('../views/Main/Main'));
const MediaVideo = LoadPage(() => import('../views/MediaVideo/MediaVideo'));
const OcrDemo = LoadPage(() => import('../views/OcrDemo/OcrDemo'));

export default function RoutePage(props) {
    return (
        <Routes>
            <Route exact path='/' element={<MainPage />} />
            <Route  path='/mediaVideo' element={<MediaVideo />} />
            <Route  path='/ocrDemo' element={<OcrDemo />} />
        </Routes>
    );
}