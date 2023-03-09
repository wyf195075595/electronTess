/*
 * @Description: 
 * @Author:  
 * @Date: 2022-06-16 10:23:56
 * @LastEditTime: 2022-06-16 10:24:23
 * @LastEditors:  
 */
export const fileToBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.onload = function(evt) {
        if(typeof callback === 'function') {
            callback(evt.target.result)
        } else {
            console.log("我是base64:", evt.target.result);
        }
    };
    reader.readAsDataURL(file);
};