$(function(){
  const nickname = getCookie('nickname')
  const cart = JSON.parse(window.localStorage.getItem('cart'))
  if(nickname){
    $('.closed p').addClass('hide')
    $('.closed .login').addClass('hide')
    
  if(!cart.length){
    $('.open').addClass('hide')
    $('.closed').removeClass('hide')
    return
  }
  $('.open').removeClass('hide')
  $('.closed').addClass('hide')
  bindHtml()
  }else{
    $('.closed p').removeClass('hide')
    $('.closed .login').removeClass('hide')
  }
  
  function bindHtml(){
    const selectAll = cart.every(item => item.is_select === '1')
    let total = 0
    let totalMoney = 0
    let totalAll = 0
    cart.forEach(item => {
      totalAll += item.cart_number
      if(item.is_select === '1'){
        total += item.cart_number - 0
        totalMoney += item.cart_number * item.goods_price
      }
    })

    let str = `
    <div class="cart-goods-list center">
    <div class="list-head">
      <div class="col col-check selectAll" >
        全选&nbsp;
        <input type="checkbox" ${ selectAll ? 'checked' : ''} >
      </div>
      <div class="col col-img">&nbsp;</div>
      <div class="col col-name">商品名称</div>
      <div class="col col-price">单价</div>
      <div class="col col-num">数量</div>
      <div class="col col-total">小计</div>
      <div class="col col-action">操作</div>
    </div>
    <div class="list-body">
    `
    cart.forEach(item => {
      str += `
      <div class="list-item">
      <div class="item-box">
        <div class="item-table">
          <div class="item-row">
            <div class="col col-check select">
              <input type="checkbox" data-id="${ item.goods_id }"${ item.is_select === '0' ? '' : 'checked'} >
            </div>
            <div class="col col-img">
              <a href="#">
                <img src="${ item.goods_big_logo }" alt="" style="width: 80px;height: 80px;">
              </a>
            </div>
            <div class="col col-name">${ item.goods_name }</div>
            <div class="col col-price">${ item.goods_price }元</div>
            <div class="col col-num">
              <div class="change-goods-num">
                <a href="" class="subNum" data-id="${ item.goods_id }">-</a>
                <input type="text" value="${ item.cart_number }">
                <a href="" class="addNum" data-id="${ item.goods_id }">+</a>
              </div>
            </div>
            <div class="col col-total">${ (item.goods_price * item.cart_number).toFixed(2) }元</div>
            <div class="col col-action">
              <button class="btn btn-danger delect" data-id="${ item.goods_id }">X</button>
            </div>
          </div>
        </div>
      </div>
    </div>
      `
       })
       
       str += `
       </div>
    </div>
  </div>
</div>
     
   
 
<div class="cart-bar center">
  <div class="section-left">
    <a href="./list.html">继续购物</a>
    <span class="cart-total">
      共
      <i>${ totalAll }</i>
      件商品，已选择
      <i class="cartNum text-danger">${ total }</i>
      件
    </span>
  </div>
  <span class="total-price">
    合计：
    <em class=" total">${ totalMoney }</em>
    元
    <a href="" class="btn btn-a">去结算</a>
  </span>
    `
    $('.open').html(str)
  }
  //给按钮添加点击事件
  $('.open').on('click', '.select > input', function(){
    const type = this.checked
    const id = $(this).data('id')
    const info = cart.filter(item => item.goods_id == id)[0]
    info.is_select = type ? '1' : '0'
    bindHtml()
    window.localStorage.setItem('cart',JSON.stringify(cart))
  })
  //全选按钮添加点击事件
  $('.open').on('click', '.selectAll > input', function(){
    const type = this.checked
    cart.forEach(item => item.is_select = type ? '1' : '0')
    bindHtml()
    window.localStorage.setItem('cart',JSON.stringify(cart))
  })
  //实现--操作
  $('.open').on('click', '.subNum', function(){
    const id = $(this).data('id')
    const info = cart.filter(item => item.goods_id == id)[0]
    if(info.cart_number === 1) return
    info.cart_number = info.cart_number - 0 - 1
    bindHtml()
    window.localStorage.setItem('cart',JSON.stringify(cart))
  })
  //实现++操作
  $('.open').on('click', '.addNum', function(){
    const id = $(this).data('id')
    const info = cart.filter(item => item.goods_id == id)[0]
    info.cart_number = info.cart_number - 0 + 1
    bindHtml()
    window.localStorage.setItem('cart',JSON.stringify(cart))
  })
  //实现删除操作
  $('.open').on('click', '.delect', function(){
    const id = $(this).data('id')
    for(let i = 0; i < cart.length; i++){
      if(cart[i].goods_id == id){
        cart.splice(i,1)
        break
      }
    }
    bindHtml()
    window.localStorage.setItem('cart',JSON.stringify(cart))
    if(!cart.length) return window.location.reload()
  })
  //清空购物车操作
  $('.open').on('click', '.clearCart', function(){
    
  })
})