### css动画硬件加速

我们写的css3动画（没有触发硬件加速的）都是使用浏览器缓慢的软件渲染引擎来执行，就是没有开启硬件加速，为了性能，这个时候或许你就需要开启硬件加速功能。Chrome, FireFox, Safari, IE9+和最新版本的Opera都支持硬件加速，当它们检测到页面中某个DOM元素应用了某些CSS规则时就会开启，最显著的特征的元素的3D变换。会创建一个复合层，使用GPU进行渲染。3D 或透视变换(perspective transform) CSS 属性 使用加速视频解码的 元素 拥有 3D (WebGL) 上下文或加速的 2D 上下文的 元素 混合插件(如 Flash) 对自己的 opacity 做 CSS 动画或使用一个动画 webkit 变换的元素 拥有加速 CSS 过滤器的元素 元素有一个包含复合层的后代节点(换句话说，就是一个元素拥有一个子元素，该子元素在自己的层里) 元素有一个 z-index 较低且包含一个复合层的兄弟元素(换句话说就是该元素在复合层上面渲染)；

##### 方法一

```js
.isaax {
   -webkit-backface-visibility: hidden;
   -moz-backface-visibility: hidden;
   -ms-backface-visibility: hidden;
   backface-visibility: hidden;
 
   -webkit-perspective: 1000;
   -moz-perspective: 1000;
   -ms-perspective: 1000;
   perspective: 1000;
}
```

##### 方法二

```css
.isaax {
   -webkit-transform: translate3d(0, 0, 0);
   -moz-transform: translate3d(0, 0, 0);
   -ms-transform: translate3d(0, 0, 0);
   transform: translate3d(0, 0, 0);
}
```

```
使用3D硬件加速提升动画性能时，最好给元素增加一个z-index属性，人为干扰复合层的排序，可以有效减少chrome创建不必要的复合层，提升渲染性能，移动端优化效果尤为明显。
```

### 