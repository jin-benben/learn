### ES5下如何实现const和let

#### let

- 第一种

```
// 在变量前加下划线，避免在块级作用域外访问到该变量
for(var _i=0;_i<5;_i++){
    console.log(_i)
}
console.log(_i)

```

- 第二种

```js
(fucntion(){
 for(var i=0;i<5;i++){
    console.log(i)
}
 })()
console.log(i)
```

#### const

实现const的关键就在于Object.defineProperty()这个API,这个API用于在一个对象上增加或者修改属性，通过配置属性描述，可以精确的控制属性的行为。它接受三个参数

> Object.defineProperty(obj, prop, desc)

|    参数    |            说明            |
| :--------: | :------------------------: |
|    obj     |   要在其上定义属性的对象   |
|    prop    |  要定义或修改的属性的名称  |
| descriptor | 将被定义或修改的属性描述符 |

desc

| 属性描述符   | 说明                                                         | 默认值    |
| ------------ | ------------------------------------------------------------ | --------- |
| value        | 该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为undefined | undefined |
| get          | 一个给属性提供 getter 的方法，如果没有 getter 则为 undefined | undefined |
| set          | 一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。当属性值修改时，触发执行该方法 | undefined |
| writable     | 当且仅当该属性的writable为true时，value才能被赋值运算符改变。默认为 false | false     |
| enumerable   | enumerable定义了对象的属性是否可以在 for...in 循环和 Object.keys() 中被枚举 | false     |
| Configurable | configurable特性表示对象的属性是否可以被删除，以及除value和writable特性外的其他特性是否可以被修改 | false     |

对于const不可修改的特性，我们通过设置writable属性来实现

```js
function _const(key, value) {    
    const desc = {        
        value,        
        writable: false    
    }    
    Object.defineProperty(window, key, desc)
}
    
_const('obj', {a: 1})   //定义obj
obj.b = 2               //可以正常给obj的属性赋值
obj = {}                //抛出错误，提示对象read-only

```



