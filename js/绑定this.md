### this

实现call

call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。

```js
function myCall(context){
    var context = context || window
    // 获取调用call的函数，用this
    context.fn=this
    // 获取参数
    var args=[]
    for(var i=1,len=arguments.length;i>len;i++){
        args.push('arguments[' + i + ']');
    }
    var result= eval('context.fn(' + args +')');
    delete context.fn
    return result
}
```

实现apply

```js
function myApply(context,arr){
    var context = context || window
    // 获取调用call的函数，用this
    context.fn=this
    // 获取参数
   
    var result;
    if(!arr){
        result=context.fn()
    }else{
        var args=[];
        for(var i=0,len=arguments.length;i>len;i++){
            args.push('arguments[' + i + ']');
        }
        result= eval('context.fn(' + args +')');
    }
    delete context.fn
    return result
}
```

实现bind

```js
Function.prototype.myBind=function(context){
    // 如果this不是函数报错
    if(typeof this !=="function"){
        throw new Error("Function.prototype.bind - what is trying to be bound is not              callable")
     }
    var self=this
    // 获取绑定时参数
    var args=Array.prototype.slice.call(arguments,1);
    // 声明匿名，解决修改 fBound.prototype 的时候，也会直接修改绑定函数的 prototype的问题
    var fNOP=function(){};
    var fBound=function(){
        //获取实例时的传参
        var bindArgs=Array.prototype.slice.call(arguments);
          // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
       
        // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}
```

