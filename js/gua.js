let numchange = function (){
    let point = '.'
    // 数字容器高度
    let height = 60
    // 每次滚动距离/滚动速度
    let p = 3
    // 数字spanclass
    let spanClass = 't-num-s'
    // 数字divclass
    let divClass = 't-num'
  //
    let cache = {}
    function createDiv(id, num, len, paddingNum){
      let str = ''
      for (let i = 0; i < len; i++) {
        str += `<div class="${divClass}" id="${id+i}"><span class="${spanClass}">${paddingNum === undefined?num[i]:paddingNum}</span></div>`
      }
      return str
    }
    function initZero(id, count){
      document.getElementById(id).innerHTML = createDiv(id,null,count,0)
    }
    function refresh(oldNum, newNum, id){
      let len = newNum.length - oldNum.length;
      for (let i = 0; i < len; i++) {
        oldNum.unshift('0')
      }
      document.getElementById(id).innerHTML = createDiv(id,oldNum,oldNum.length)
    }
    function refresh1(oldNum, newNum, id){
      let len = oldNum.length - newNum.length;
      for (let i = 0; i < len; i++) {
        oldNum.shift()
      }
      document.getElementById(id).innerHTML = createDiv(id,oldNum,oldNum.length)
    }
    function scrollNum(id, num, order){
      let h = num * height
      let e = document.getElementById(id)
      let t = setInterval(() => {
        let m = e.scrollTop;
        m = m + p
        if(m > h){
          clearInterval(t)
          let cs = e.children
          for (let i = cs.length-2; i >= 0; i--) {
            e.removeChild(cs[i])
          }
          return
        }
        e.scrollTop = m
      }, 10)
    }
    function createSpan(num){
      let span = document.createElement('span')
      span.className = spanClass
      span.innerText = num
      return span
    }
    function appendNum(id, start, end){
      let f = document.createDocumentFragment()
      let count = 0
      if(start === end && isNaN(start)){
        return 0
      }
      if(isNaN(start) && !isNaN(end)){
        for (let i = 0; i <= end; i++) {
          f.appendChild(createSpan(i))
          count++
        }
        document.getElementById(id).appendChild(f)
        return count
      }
      if(!isNaN(start) && isNaN(end)){
        for (let i = start+1; i <= 9; i++) {
          f.appendChild(createSpan(i))
          count++
        }
        f.appendChild(createSpan('.'))
        count++
        document.getElementById(id).appendChild(f)
        return count
      }
      if(start < end){
        for (let i = start+1; i <= end; i++) {
          f.appendChild(createSpan(i))
          count++
        }
      }else if(start > end){
        for (let i = start+1; i <= 9; i++) {
          f.appendChild(createSpan(i))
          count++
        }
        for (let i = 0; i <= end; i++) {
          f.appendChild(createSpan(i))
          count++
        }
      }else{
        return 0
      }
      document.getElementById(id).appendChild(f)
      return count
    }
   
    /**
     * @param id 容器id
     * @param num 展示的数字
     */
    function change(id, num){
      // console.log(num)
      let strArr = num.toString().split('');
      let oldNum = cache[id]
      // 如果没有缓存，开始数字全部填充0
      if(!oldNum){
        initZero(id,strArr.length)
        oldNum = []
      }else{
        oldNum = cache[id].toString().split('')
        // 如果新数字长，原来数字左侧填充0
        if(oldNum.length < strArr.length){
          refresh(oldNum, strArr, id)
          // 如果新数字短，原来数字左侧移除
        }else if(oldNum.length > strArr.length){
          refresh1(oldNum, strArr, id)
        }
      }
      // 循环比较每个数字差异，添加需要滚动的数字列
      for (let i = 0, len = strArr.length; i < len; i++) {
        let start = oldNum[i] !== point ? parseInt(oldNum[i]||0) : oldNum[i]
        let end = strArr[i] !== point ? parseInt(strArr[i]||0) : strArr[i]
        let count = appendNum(id+i, start, end)
        if(count > 0){
          // 数字滚动
          scrollNum(id+i, count, i+1)
        }
      }
      cache[id] = num
    }
   
    function config(param){
      if(param.p){
        p = param.p
      }
      if(param.height){
        height = param.height
      }
      if(param.spanClass){
        spanClass = param.spanClass
      }
      if(param.divClass){
        divClass = param.divClass
      }
      return scroll
    }
   
    let scroll = {
      change: change,
      config: config
    }
    return scroll
  }


// $.ajax({  //ajax显示发帖
//     url:'getsite_mysql.php',//路径
//     type:'POST',//类型
//     data: {"q":str},//数据
//     async:true,//异步
//     success:function(response,status,xhr){
//         //alert(response);
//         //document.getElementById("txtHint").innerHTML=response;
//         $('#txtHint').text("");
//         $('#txtHint').append(response);
//     }
// });

// let _axios = axios.create(); // 创建axios实例
// // 请求拦截器
// _axios.interceptors.request.use(
// // 请求成功
//   function (config) {
//     const token = localStorage.getItem("token")
//     if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
//       config.headers.authorization = token //请求头加上token
//     }
//     Toast.loading({
//       message: "加载中…",
//       forbidClick: true,
//     });
//     return config
//   },
//   // 请求失败
//   function (error) {
//     return Promise.reject(error)
//   }
// )
      