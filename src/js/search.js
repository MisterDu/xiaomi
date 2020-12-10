//搜索引擎
var inp = document.querySelector('.search-text')
var ul = document.querySelector('.header_search ul')
function bindHtml(res){
  if(!res.g){
    ul.classList.remove('active')
    return
  }
  let str = ''

  for (let i = 0; i < res.g.length; i++) {
    str += `
      <li>${ res.g[i].q }</li>
    `
  }

  ul.innerHTML = str
  // 让 ul 显示出来
  ul.classList.add('active')
}
inp.addEventListener('input',function(){
  const value = this.value.trim()
  if(!value){
    ul.classList.remove('active')
    return
  }
  const script = document.createElement('script')
  const url = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1446,32857,33124,33061,32973,33099,33101,32962,22159&wd=${value}&req=2&csor=1&cb=bindHtml&_=1605768936993`
  script.src = url
  document.body.appendChild(script)
  script.remove()
  })