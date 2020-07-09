import './style.scss'
import baidu from './baidutest3.jpg'

function component() {
  const body = document.querySelector('body')
  const footer = document.querySelector('.all-footer')
  const baidulink = document.createElement('a')
  const baiduimg = new Image()

  baidulink.href = "https://data1.fly2cn.net/update/android/v1.1.5/app_v1.1.5_fly2cn_gw.apk"  
  baiduimg.src = baidu
  baidulink.appendChild(baiduimg)

  body.insertBefore(baidulink, footer)
}

component()