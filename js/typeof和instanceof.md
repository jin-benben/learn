### `typeof`和`instanceof`

区别：都能判断变量类型，前者是判断这个变量是什么类型，返回的是类型字符串，后者是判断这个变量是不是某种类型，返回的是布尔值

#### `typeof`

typeof返回一个数据类型的字符串,而且都是小写的字符串,返回值有'number','boolean','string','function','object','undefined'这几个

```
typeof` `100; ``//'number'
typeof` `(1==1); ``//'boolean'
typeof` `'onepixel'``; ``//'string'
typeof` `{} ; ``//'object'
typeof` `onepixel; ``// 'undefined'
typeof` `parseInt; ``// 'function'
typeof` `[];``//'object'
typeof` `new` `Date(); ``//'object'

```

缺陷：

1.不能判断变量具体的数据类型比如数组、正则、日期、对象，因为都会返回object,不过可以判断function，如果检测对象是正则表达式的时候,**在Safari和Chrome中使用typeof的时候会错误的返回"function",**其他的浏览器返回的是object.

2.判断null的时候返回的是一个object，这是js的一个缺陷,判断NaN的时候返回是number

#### `instanceof`

可以用来检测这个变量是否为某种类型，返回的是布尔值，并且可以判断这个变量是否为某个函数的实例，它检测的是对象的原型

```js
[] instanceof Array; //true
{} instanceof Object;//true
new Date() instanceof Date;//true
function Person(){} [] instanceof Object; //true
new Date()  instanceof Object;//tru
new Person instanceof Object;//true
var array = new Array()
array instanceof Array //true
```

 ```js
// instanceof原理
function _instanceof(L, R) { //L为instanceof左表达式，R为右表达式
  let Ro = R.prototype //原型
  L = L.__proto__ //隐式原型
  while (true) {
    if (L === null) { //当到达L原型链顶端还未匹配，返回false
      return false
    }
    if (L === Ro) { //全等时，返回true
      return true
    }
    L = L.__proto__
  }
}

 ```



优点：能检测array,function,object类型 

 缺点:检测不了number,boolean,string

#### `object.prototype.toString.call()`

```js
console.log(Object.prototype.toString.call(123)) //[object Number]
console.log(Object.prototype.toString.call('123')) //[object String]
console.log(Object.prototype.toString.call(undefined)) //[object Undefined]
console.log(Object.prototype.toString.call(true)) //[object Boolean]
console.log(Object.prototype.toString.call({})) //[object Object]
console.log(Object.prototype.toString.call([])) //[object Array]
console.log(Object.prototype.toString.call(function(){})) //[object Function]
```

```js
// 判断变量类型
var type = function (o) {
    var s = Object.prototype.toString.call(o)
    return s.slice(8,-1).toLowerCase()
}
```



优点：能准确的判断所有的类型。

 缺点：写法过于繁琐