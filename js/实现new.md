### new

new运算符创建一个用户定义的对象类型的实例或者具有构造函数的内置对象类型

```js
function objectFactory(){
    // 创建一个新的对象
    var obj=new Object();
    // 获取构造函数，链接到原型
    Constructor=[].shif.call(arguments)；// 取出arguments中第一个参数，会修改掉arguments
    obj.__proto__=Constructor.prototype
    // 修改this  arguments已被修改
    var ret = Constructor.apply(obj,arguments)
    // 返回对象
    return typeof ret ==='object'?ret:obj;
    
}
```

