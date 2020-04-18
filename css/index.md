### 盒模型

元素都是按照盒模型的规则在页面布局的。盒模型由`margin`+`border`+`padding`+`content`四个属性组成，分为两种：

- W3C的标准盒模型   

​          width=content 不包含border+padding

-  IE盒模型     

  with = border + padding + content

相互转换：

​	二者之间可以通过CSS3的**box-sizing**属性来转换；

​	box-sizing:content-box;是W3C盒模型；

​	box-sizing:border-box 是IE盒模型

### BFC

BFC的全称是Block Formatting Context,也就是块级格式化上下文。是一个独立渲染的区域，让处于BFC内部的元素与外部的元素相互隔离，是内外元素的定位不会相互影响；

- 触发条件

  - 根元素（html）

  - 浮动元素（元素的float不是none）

  - 绝对定位的元素（position：fixed或者position：absolute）

  - 行内块元素（display:inline-block）

  - 表格单元格（display:table-cell）

  - 表格标题（display:table-caption）

  - 匿名表格单元格元素（元素的 display为 table、table-row、table-row-group、table-header-group、table-footer-group（分别是HTML table、row、tbody、thead、tfoot的默认属性）或 inline-table）

  - overflow的值不为visible的块元素

  - display的值为float-root的元素

  - contain 值为 layout、content或 paint 的元素

  - 弹性元素（display为 flex 或 inline-flex元素的直接子元素）[flex布局](<http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html>)

  - 网格元素（display为 grid 或 inline-grid 元素的直接子元素）[网格布局](<http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html>)

  - 多列容器（元素的 column-count 或 column-width 不为 auto，包括 column-count 为 1） column-span 为 all 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）

    

- 规则

  - 内部的box会在垂直方向一个接一个的放置
  - box垂直方向的距离由margin决定，属于同一个BFC的两个相邻的box的margin会发生重叠
  - BFC中子元素的margin box的左边，与包含块的border box的左边相接触（子元素absolute除外）
  - BFC的区域不会与float的元素区域重叠
  - 计算BFC的高度是，浮动的子元素也参与计算
  - BFC是页面上的一个隔离的容器，容器里面的子元素不会影响到外面的元素，反之亦然。

  

- 应用

  - 阻止margin重叠
  - 清除浮动（清除浮动的原理的就是两个div都位于同一个BFC区域之中）
  - 自适应两栏布局
  - 阻止元素被浮动元素覆盖

### 清除浮动

   清除浮动主要是为了防止父元素塌陷，

   ##### 方法一 ：clearfix(伪类)

```html
<div class="outer clearfix">
    <div class="inner">
        inner
    </div>
</div>
```

```#css
.outer{background:blue}
.inner{width:100px;height:100px;background:red;float:right}
.clearfix:after{
    content:'';
    display:block;
    height:0;
    clear:both;
    visibility:hidden
}

```

##### 方法二 额外增加一个div,添加clear：both

```js
<div class="container">
    <div class="inner"></div>
    <div class="clear"></div>
</div>
.container{
    background: blue;
}
.inner {
    width: 100px;
    height: 100px;
    background: red;
    float: left;
}
.clear{
    clear:both;
}

```

##### 方法三 触发父盒子BFC overflow:hidden

``` ht
<div class="outer">
    <div class="inner">inner</div>
</div>
.outer{
    background: blue;
    overflow: hidden;
}
.inner {
    width: 100px;
    height: 100px;
    background: red;
    float: left;
}

```

### CSS权重计算

CSS基本选择器：ID选择器、类选择器、标签选择器、通配符选择器。

!important>行内样式>ID选择器>类选择器>标签选择器>通配符选择器> 继承 > 默认;

关于权重计算，有两种不同的计算方式：一种是以二进制的规则计算，一种是以1,10,100,1000这种的计算方式。

各选择器权值：

- 内联样式 权值1000
- ID选择器，权值0100
- 类、伪类和属性选择器，权值为0010
- 标签选择器和伪元素选择器，权值为0001
- 通配符、子选择器、相邻选择器等，权值为0000
- 继承没有权值

比较方式：如果层级相同，继续往后比较，如果层级不同，层级高的权值大，不论层级有多少个选择器



### flex 布局

flex弹性布局，任何一个容器都可以指定为flex布局 声明display属性值为flex或者inline-flex。设为 Flex 布局以后，子元素的`float`、`clear`和`vertical-align`属性将失效。

#### 容器属性

- flex-direction:属性决定主轴的方向；它有四个值
  - `row`（默认值）：主轴为水平方向，起点在左端。
  - `row-reverse`：主轴为水平方向，起点在右端。
  - `column`：主轴为垂直方向，起点在上沿。
  - `column-reverse`：主轴为垂直方向，起点在下沿。

- `flex-wrap属性定义，如果一条轴线排不下，如何换行它有四个值
  - nowrap(默认值)：不换行
  - wrap：换行，第一行在上方
  - wrap-reverse:换行，第一行在下方
- `flex-flow`属性是flex-direction和属性flex-wrap的缩形式  
  - eg: flex-flow: row wrap;
- `justify-content`属性定义了项目在主轴上的对齐方式。它可能取5个值，具体对齐方式与轴的方向有关。下面假设主轴为从左到右。
  - flex-start(默认值)：左对齐
  - flex-end:右对齐
  - center：居中
  - space-between：两端对齐，项目之间的间隔相等
  - space-around：每个项目两侧的间隔相等

- `align-items`属性定义项目在交叉轴上如何对齐。它可能取5个值。具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下。
  - `flex-start`：交叉轴的起点对齐。
  - `flex-end`：交叉轴的终点对齐。
  - `center`：交叉轴的中点对齐。
  - `baseline`: 项目的第一行文字的基线对齐。
  - `stretch`（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

- `align-content`属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
  - `flex-start`：与交叉轴的起点对齐。
  - `flex-end`：与交叉轴的终点对齐。
  - `center`：与交叉轴的中点对齐。
  - `space-between`：与交叉轴两端对齐，轴线之间的间隔平均分布。
  - `space-around`：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
  - `stretch`（默认值）：轴线占满整个交叉轴。

#### 项目属性

- `order`属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

- `flex-grow`属性定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大。

- `flex-shrink`属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

- `flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。

- `flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。该属性有两个快捷值：`auto` (`1 1 auto`) 和 none (`0 0 auto`)。

  建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

- `align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。 align-self: auto | flex-start | flex-end | center | baseline | stretch;


### position属性

position属性用于指定一个元素在文档中的定位方式。取值：

- static 该关键字指定元素使用正常的布局行为
- relative 相对定位，相对于其自身正常位置进行定位。
- fixed 固定定位，相对于浏览器窗口进行定位。
- absolute 绝对定位，相对于 static 定位以外的第一个父元素进行定位。
- inherit 规定应该从父元素继承 position 属性的值。


### 如何用css实现一个三角形

#### 方法一

```css
.triangle {
    height:0;
    width:0;
    border-color:red transparent transparent transparent;
    border-style:solid;
    border-width:30px;
}
```
#### 方法二 利用CSS3的clip-path属性 [chip-path](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path)

``` css
.triangle {
    width: 30px;
    height: 30px;
    background: red;
    clip-path: polygon(0px 0px, 0px 30px, 30px 0px); // 将坐标(0,0),(0,30),(30,0)连成一个三角形
    transform: rotate(225deg); // 旋转225，变成下三角
}

```





