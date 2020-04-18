function objectFactory () {
    let obj=new Object()
    let Constructor=[].shift.call(arguments);
    obj.__proto__=Constructor.prototype;
    // 可以使用Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
    // let obj=Object.create(Constructor.prototype)
    var ret=Constructor.apply(obj,arguments);
    return typeof ret ==='object'?ret:obj;
}

function myCall(context){
   var context=context || window
   context.fn=this;
   let args=[];
   for(let i=1;i<arguments.length;i++){
     args.push('arguments['+ i+']')
   }
   const result = eval('context.fn('+ args +')');
   delete context.fn
   return result
}

function myApply(context,arr){
  var context=context||window;
  context.fn=this
  let argss=[];
  for(let i=0;i<arr.length;i++){
    args.push('arr['+ i+']')
  }
  const result = eval('context.fn('+ argss +')');
  delete context.fn
  return result
}

function myBind(context){
  var self=this;
  var args=Array.prototype.slice(arguments,1);
  var fNOP=function(){ }
  var fBound=function(){
     var bingArgs=Array.prototype.slice(arguments)
     return self.apply(this instanceof fNOP ? this : context,args.concat(bingArgs))
  }
  fNOP.prototype=this.prototype;
  fBound.prototype=new fNOP()
  return fBound
}