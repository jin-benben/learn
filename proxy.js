// let user={
//   name:'ben',
//   age:18
// }

// user=new Proxy(user,{
//   get(target,props){
//     if(props in target){
//       return target[props]
//     }else{
//       return '没有此属性'
//     }
//   },
//   set(target,props,value){
//     if(props in target){
//       target[props]=value
//       return true
//     }else{
//       return false
//     }
//   }
// })
// user.age=19;
// user.sex='男'
// console.log(user)
// console.log(user.sex)
// console.log(user.name)
function foo() {
  console.log(a);
  a = 1;
}
foo(); //输出1不会报错