//1、引入express
const express = require('express');
//2、创建应用对象
const app = express();
//3、创建路由规则
//request 对请求报文的封装
//response 对响应报文的封装
app.get("/server", (request, response) => {
    //设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    //设置响应体
    response.send("HELLO AJAX...");
});
//可以接收任意类型的请求（GET POST...）
app.all("/server", (request, response) => {
    //设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    //设置允许自定义响应头
    response.setHeader('Access-Control-Allow-Headers', '*')
    //设置响应体
    response.send("HELLO AJAX POST...");
});

app.all("/json-server", (request, response) => {
    //设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    //设置允许自定义响应头
    response.setHeader('Access-Control-Allow-Headers', '*');
    const data = {
        name: 'xutingting',
        age: '23'
    };

    let str = JSON.stringify(data);//将对象转换为字符串，因为响应体默认接收字符串的数据类型
    //设置响应体
    response.send(str);
});

//测试IE缓存问题
app.all("/ie", (request, response) => {
    //设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');

    response.send("HELLO IE -5");
});

//测试IE缓存问题
app.all("/delay", (request, response) => {
    //设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    setTimeout(() => {
        response.send("延时响应");
    }, 3000);
});

app.all("/cancle", (request, response) => {
    //设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    setTimeout(() => {
        response.send("延时响应");
    }, 3000);
});

app.all("/repeat", (request, response) => {
    //设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    setTimeout(() => {
        response.send("延时响应");
    }, 3000);
});

//4、监听端口启动服务
app.listen(8000, () => {
    console.log("服务已经启动,8000端口监听中...")
})