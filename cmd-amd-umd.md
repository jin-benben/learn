#### CMD,AMD,UMD

##### CMD--Common Module Definition - 公共模块定义

CMD是SeaJS在推广过程中对模块定义的规范化产出，对于模块的依赖，CMD是延迟执行，推崇依赖就近。

``` javascript
define((require, exports, module) => {
  module.exports = {
    fun1: () => {
       var $ = require('jquery');
       return $('#test');
    } 
  };
});
```

##### AMD--Asynchromous Module Definition - 异步模块定义

AMD是RequireJS在推广过程中对模块定义的规范化产出，AMD是异步加载模块，推崇依赖前置。

``` javascript
define('module1', ['jquery'], ($) => {
  //do something...
});
```

##### UMD--Universal Module Definition - 通用模块定义

UMD是AMD和CommonJS的一个糅合。AMD是浏览器优先，异步加载；CommonJS是服务器优先，同步加载。

既然要通用，怎么办呢？那就先判断是否支持node.js的模块，存在就使用node.js；再判断是否支持AMD（define是否存在），存在则使用AMD的方式加载。这就是所谓的UMD。

``` javascript
((root, factory) => {
  if (typeof define === 'function' && define.amd) {
    //AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    //CommonJS
    var $ = requie('jquery');
    module.exports = factory($);
  } else {
    //都不是，浏览器全局定义
    root.testModule = factory(root.jQuery);
  }
})(this, ($) => {
  //do something...  这里是真正的函数体
});
```



##### CommonJS

``` javascript
//file1.js
moudle.exports = {
  a: 1
};

//file2.js
var f1 = require('./file1');
var v = f1.a + 2;
module.exports ={
  v: v
};
```

CommonJS是服务端模块的规范。根据CommonJS规范，一个单独的文件就是一个模块。加载模块使用require方法，该方法读取一个文件并执行，最后返回文件内部的module.exports对象。CommonJS 加载模块是同步的，所以只有加载完成才能执行后面的操作。像Node.js主要用于服务器的编程，加载的模块文件一般都已经存在本地硬盘，所以加载起来比较快，不用考虑异步加载的方式，所以CommonJS规范比较适用。但如果是浏览器环境，要从服务器加载模块，这是就必须采用异步模式。所以就有了 AMD CMD 解决方案。





