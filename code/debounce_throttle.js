// 防抖：一定时间内只触发一次，如果再次触发，则重置时间
function debounce (func,wait) {
    var timeout;
    return function () {
       context=this;
       args=arguments;
       if(timeout)clearTimeout(timeout)
       timeout=setTimeout(()=>{
         func.apply(context,args)
       },wait)
    }
}

// 节流：每隔一段时间就执行一次
// 方法一 时间戳
function throttle1 (func,wait) {
   let prev=0;
   return function(){
      context=this;
      args=arguments;
      let now=new Date().getTime();
      if(now-prev>wait){
        func.apply(context,args)
        prev=now
      }

   }
}
// 方法二 定时器
function throttle2 (func,wait) {
  let timeout=0;
  return function(){
     context=this;
     args=arguments;
     if(!timeout){
       timeout=setTimeout(function(){
         timeout=null
         func.apply(context,args)
       },wait)
     }

  }
}

