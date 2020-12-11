/**
 * 
 * @authors cherish yii2 (cherish@cherish.pw)
 * @date    2020-12-10 16:48:28
 * @version v1.0
 * @description the core js of todolist project
 * 
 * ━━━━━━神兽出没━━━━━━
 * 　　   ┏┓　 ┏┓
 * 　┏━━━━┛┻━━━┛┻━━━┓
 * 　┃              ┃
 * 　┃       ━　    ┃
 * 　┃　  ┳┛ 　┗┳   ┃
 * 　┃              ┃
 * 　┃       ┻　    ┃
 * 　┃              ┃
 * 　┗━━━┓      ┏━━━┛ Code is far away from bugs with the animal protecting.
 *       ┃      ┃     神兽保佑,代码无bug。
 *       ┃      ┃
 *       ┃      ┗━━━┓
 *       ┃      　　┣┓
 *       ┃      　　┏┛
 *       ┗━┓┓┏━━┳┓┏━┛
 *     　  ┃┫┫　┃┫┫
 *     　  ┗┻┛　┗┻┛
 *
 * ━━━━━━感觉萌萌哒━━━━━━
 */

// 请根据考试说明文档中列出的需求进行作答
// 预祝各位顺利通过本次考试，see you next week！
// ...

$(function(){
  //渲染页面
  const todo = JSON.parse(window.localStorage.getItem('todo')) || []
  const toded = JSON.parse(window.localStorage.getItem('todo')) || []
  const todo2 = JSON.parse(window.localStorage.getItem('todo2')) || []
  const toded2 = JSON.parse(window.localStorage.getItem('todo2')) || []
  
  bindHtml()
  function bindHtml(){
    let str = ''
    toded.forEach(item => {
      str += `
      <li>
        <input type="checkbox" />
        <p onclick="edit(2)">${ item }</p>
        <a href="javascript:remove()">-</a>
      </li>
      `
    })
    $('.demo-box').html(str)
    $('section #todocount').text(toded.length)
  }

  bindHtml2()
  function bindHtml2(){
    let str = ''
    toded2.forEach(item => {
      str += `
      <li>
        <input type="checkbox" checked="checked" />
        <p onclick="edit(2)">${ item }</p>
        <a href="javascript:remove()">-</a>
      </li>
      `
    })
    $('#donelist').html(str)
    $('section #donecount').text(toded2.length)
  }

  //删除
  $('.demo-box').on('click','a',function(){
    const value = $(this).prev().text()
    for(var i = 0; i < todo.length; i++){
      if(todo[i] === value){
        todo.splice(i,1)
        window.localStorage.setItem('todo',JSON.stringify(todo))
        window.location.reload()
        break
      }
    }
  })

  $('#donelist').on('click','a',function(){
    const value = $(this).prev().text()
    for(var i = 0; i < todo.length; i++){
      if(todo2[i] === value){
        todo2.splice(i,1)
        window.localStorage.setItem('todo2',JSON.stringify(todo2))
        window.location.reload()
        break
      }
    }
  })
  //切换
  $('.demo-box').on('click','input',function(){
    const inp = $(this).parent()[0]
    $('#donelist').append(inp)
    const value = $(this).next().text()
    for(var i = 0; i < todo.length; i++){
      if(todo[i] === value){
        todo.splice(i,1)
        window.localStorage.setItem('todo',JSON.stringify(todo))
        break
      }
    }
    todo2.push(value)
    window.localStorage.setItem('todo2',JSON.stringify(todo2))
    window.location.reload()
  })


  $('#donelist').on('click','input',function(){
    const inp = $(this).parent()[0]
    $('.demo-box').append(inp)
    const value = $(this).next().text()
    todo.push(value)
    window.localStorage.setItem('todo',JSON.stringify(todo))
    
    for(var i = 0; i < todo2.length; i++){
      if(todo2[i] === value){
        todo2.splice(i,1)
        window.localStorage.setItem('todo2',JSON.stringify(todo2))
        break
      }
    }
    window.location.reload()
  })    
  //添加
  $('form input').keydown(function(e){
    e = e || window.event
    if(e.keyCode == '13'){
      let value = $.trim($(this).val())
      if(!value) return
      $(this).val('')
      let str = `
      <li>
        <input type="checkbox" />
        <p onclick="edit(2)">${ value }</p>
        <a href="javascript:remove()">-</a>
      </li>
      `
      // $('.demo-box').append(str)
      todo.push(value)
      //储存本地缓存
      window.localStorage.setItem('todo',JSON.stringify(todo))
      //重新渲染
      window.location.reload()
    }
  })

  $('')

})