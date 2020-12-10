  function setCookie(key,value,expires){
    if(!expires) return document.cookie = key + '=' + value
    const time = new Date()
    time.setTime(time.getTime() - 1000 * 60 * 60 * 8 + expires * 1000 )
    document.cookie = `${key}=${value};expires=` + time
  }
  function getCookie(key){
    const obj = {}
    const tmp = document.cookie.split('; ')
    tmp.forEach(function(item){
      const t = item.split('=')
      obj[t[0]] = t[1]
    })
    return key ? obj[key] : obj
  }

$(function(){
//用户昵称
const nickname = getCookie('nickname')
  if(nickname) {
    $('.off').addClass('hide')
    $('.on').removeClass('hide').text(`您好！${nickname}`)
    // setCartNum()
  }else{
    $('off').removeClass('hide')
    $('on').addClass('hide')
  }
})

const nickname = getCookie('nickname')
const cart = JSON.parse(window.localStorage.getItem('cart'))
let totalnum = 0
let str = ''
if(nickname){
  cart.forEach(item => {
    totalnum += item.cart_number - 0
  })
  $('.cart_num').text('(' + totalnum + ')').css({'color': 'red'})
  str += `
    <ul>
      `
  cart.forEach(item => {
    str += `
      <li data-id="${ item.goods_id }">
        <div class="photo">
          <img src="${ item.goods_big_logo }" style="width:40px;height:40px;">
        </div>
        <div class="name">${ item.goods_name }</div>
        <div class="price">${ item.goods_price }元</div>
        <div class="num">${ item.cart_number }</div>
      </li>
    `
  })
  str += `
    </ul>
  `
  let height = 61 * (cart.length - 0) 
  $('.cart-menu').html(str)
  $('.cart').mouseover(function(){
    $('.cart-menu').css({'height': height})
  })
  $('.cart').mouseout(function(){
    $('.cart-menu').css({'height': 0})
  })

  $('.cart-menu').on('click', 'li', function(){
    const id = $(this).data('id')
    setCookie('goods_id', id)
    window.location.href = './detail.html'
  })
}

