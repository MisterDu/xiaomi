$(function () {
  $('#login').validate({
    rules: {
      username: {
        required: true,
        minlength: 5,
        maxlength: 10,
      },
      password: {
        required: true,
        minlength: 6,
        maxlength: 12
      }
    },
    messages: {
      username: {
        required: '请填写用户名信息',
        minlength: '请输入至少5个字符',
        maxlength: '请输入不超过10个字符'
      }
    },
    submitHandler(form){
      const info = $(form).serialize()
      $.post('/gx', info, null, 'json').then(res =>{
        if(res.code === 1){
          setCookie('nickname',res.nickname)
          window.location.href = './index.html'
          console.log(res.nickname)
        }else if(res.code === 0){
          $('.login_error').removeClass('hide')
        }
      })
    }
  })
})