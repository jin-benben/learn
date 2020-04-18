## Redux设计理念

Redux是将整个应用状态存储到一个地方上称为**store**,里面保存着一个状态树**store tree**,组件可以派发(dispatch)行为(action)给store,而不是直接通知其他组件，组件内部通过订阅**store**中的状态**state**来刷新自己的视图。

![img](https://upload-images.jianshu.io/upload_images/6548744-df461a22f59ef7da.png?imageMogr2/auto-orient/strip|imageView2/2/w/800/format/webp)

## Redux三大原则

- 1 唯一数据源

  > 整个应用的state都被存储到一个状态树里面，并且这个状态树，只存在于唯一的store中

- 2 保持只读状态

  > state是只读的，唯一改变state的方法就是触发action，action是一个用于描述以发生时间的普通对象

- 3 数据改变只能通过纯函数来执行

  > 使用纯函数来执行修改，为了描述action如何改变state的，你需要编写reducers

## Redux概念解析

### 1 Store

- store就是保存数据的地方，你可以把它看成一个数据，整个应用智能有一个store
- Redux提供createStore这个函数，用来生成Store

```jsx
import {createStore} from 'redux'
const store=createStore(fn);
```

### 2 State

state就是store里面存储的数据，store里面可以拥有多个state，Redux规定一个state对应一个View,只要state相同，view就是一样的，反过来也是一样的，可以通过**store.getState( )**获取

```jsx
import {createStore} from 'redux'
const store=createStore(fn);
const state=store.getState()
```

### 3 Action

state的改变会导致View的变化，但是在redux中不能直接操作state也就是说不能使用**this.setState**来操作，用户只能接触到View。在Redux中提供了一个对象来告诉Store需要改变state。Action是一个对象其中type属性是必须的，表示Action的名称，其他的可以根据需求自由设置。

```go
const action={
  type:'ADD_TODO',
  payload:'redux原理'
}
```

在上面代码中，Action的名称是ADD_TODO，携带的数据是字符串‘redux原理’，Action描述当前发生的事情，这是改变state的唯一的方式

### 4 store.dispatch( )

store.dispatch( )是view发出Action的唯一办法

```css
store.dispatch({
  type:'ADD_TODO',
  payload:'redux原理'
})
```

store.dispatch接收一个Action作为参数，将它发送给store通知store来改变state。

### 5 Reducer

Store收到Action以后，必须给出一个新的state，这样view才会发生变化。这种**state的计算过程**就叫做Reducer。
 Reducer是一个纯函数，他接收Action和当前state作为参数，返回一个新的state

> **注意：**Reducer必须是一个纯函数，也就是说函数返回的结果必须由参数state和action决定，而且不产生任何副作用也不能修改state和action对象

```jsx
const reducer =(state,action)=>{
  switch(action.type){
    case ADD_TODO:
        return newstate;
    default return state
  }
}
```

