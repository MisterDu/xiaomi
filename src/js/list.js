$(function () {
  let list = null
  const list_info = {
    cat_one: 'all',
    cat_two: 'all',
    cat_three: 'all',
    sort_method: '综合',
    sort_type: 'ASC',
    current: 1,
    pagesize: 12,
  }

  //获取一级菜单信息
  getCateOne()
  async function getCateOne(){
    const cat_one_list = await $.get('/gx5', null, null, 'json')
    let str = `<span data-type="all" class="active">全部</span>`
    cat_one_list.list.forEach(item => {
      str += `
        <span data-type="${item.cat_one_id}">${item.cat_one_id}</span>
      `
    })
    $('.cateOneBox > .right').html(str)
  }
  //一级菜单点击事件
  $('.cateOneBox').on('click', 'span', function(){
    $(this).addClass('active').siblings().removeClass('active')
    const type = $(this).data('type')
    list_info.cat_one = type
    $('.cateThreeBox > .right').html('<span data-type="all" class="active">全部</span>')
    list_info.cat_two = 'all'
    list_info.cat_three = 'all'
    list_info.current = 1
    getTotalPage()
    getGoodsList()
    if(type === 'all'){
      $('.cateTwoBox > .right').html('<span data-type="all" class="active">全部</span>')
    }else{
      getCateTwo()
    }
  })
  //获取二级菜单信息
  getCateTwo()
  async function getCateTwo(){
    const cat_two_list = await $.get('/gx6',{cat_one: list_info.cat_one}, null, 'json')
    let str = `<span data-type="all" class="active">全部</span>`
    cat_two_list.list.forEach(item => {
      str += `
        <span data-type="${item.cat_two_id}">${item.cat_two_id}</span>
      `
    })
    $('.cateTwoBox > .right').html(str)
  }
  //二级菜单点击事件
  $('.cateTwoBox').on('click', 'span', function(){
    $(this).addClass('active').siblings().removeClass('active')
    const type = $(this).data('type')
    list_info.cat_two = type
    list_info.cat_three = 'all'
    list_info.current = 1
    getTotalPage()
    getGoodsList()
    if(type === 'all'){
      $('.cateThreeBox > .right').html('<span data-type="all" class="active">全部</span>')
    }else{
      getCateThree()
    }
  })
 //获取三级菜单信息
 getCateThree()
 async function getCateThree(){
   const cat_three_list = await $.get('/gx7', {cat_one: list_info.cat_one, cat_two: list_info.cat_two}, null, 'json')
   let str = `<span data-type="all" class="active">全部</span>`
   cat_three_list.list.forEach(item => {
     str +=`
      <span data-type="${item.cat_three_id}">${item.cat_three_id}</span>
     `
   })
   $('.cateThreeBox > .right').html(str)
 }
 //三级菜单点击事件
 $('.cateThreeBox').on('click', 'span', function(){
   $(this).addClass('active').siblings().removeClass('active')
   const type = $(this).data('type')
   list_info.cat_three = type
    list_info.current = 1
    getTotalPage()
    getGoodsList()
 })
 //获取总页数
  getTotalPage()
  async function getTotalPage(){
    const totalInfo = await $.get('/gx4', list_info, null, 'json')
    
    $('.pagination').pagination({
      pageCount: totalInfo.total,
      callback(index){
        list_info.current = index.getCurrent()
        getGoodsList()
      }
    })
  }
  //获取商品列表
  getGoodsList()
  async function getGoodsList(){
    const goodsList = await $.get('/gx2', list_info, null, 'json')
    list = goodsList.list
    let str = ''
    goodsList.list.forEach(item => {
      str += `
      <li class="thumbnail">
      <img src="${item.goods_big_logo}" alt="...">
      <div class="caption">
        <h3 data-id="${ item.goods_id }">${item.goods_name}</h3>
        <p class="price">￥ <span class="text-danger">${item.goods_price}</span></p>
        <p>
          <a href="javascript:;" class="btn btn-danger addCart" role="button" data-id="${item.goods_id}">加入购物车</a>
          <a href="./cart.html" class="btn btn-success" role="button">去结算</a>
        </p>
      </div>
    </li>
      `
    })
    $('.goodsListBox').html(str)
  }
  //排序点击事件
  $('.sortBox').on('click', 'span', function(){
    const method = $(this).attr('data-method')
    const type = $(this).attr('data-type')
    $(this).addClass('active').siblings().removeClass('active')
    list_info.sort_method = method
    list_info.sort_type = type
    getTotalPage()
    getGoodsList()
    $(this)
    .attr('data-type',type === 'ASC' ? 'DESC' : 'ASC')
    .siblings()
    .attr('data-type','ASC')
  })
  //点击跳转详情页
  $('.goodsListBox').on('click', 'h3', function(){
    const id = $(this).data('id')
    setCookie('goods_id', id)
    window.location.href = './detail.html'
  })
  //加入购物车操作
  $('.goodsListBox').on('click', '.addCart', function(){
    const cart = JSON.parse(window.localStorage.getItem('cart')) || []
    const id = $(this).data('id')
    const flag = cart.some(item => item.goods_id == id)
    if(flag){
      const cart_goods = cart.filter(item => item.goods_id == id)[0]
      cart_goods.cart_number = cart_goods.cart_number - 0 + 1
    }else{
      const info = list.filter(item => item.goods_id == id)[0]
      info.cart_number = 1
      cart.push(info)
    }
    window.localStorage.setItem('cart', JSON.stringify(cart))
  })
})