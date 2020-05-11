//
// app 初始化加载
//
export default function () {
  //挂载客户端启动事件
  const init = () => {
    if (!window.is_api) return;
    window.api_loaded = true
    const api = window.api
    const bar = window.document.getElementById('status_bar')
    bar.style.height = api.safeArea.top + 'px'
  }
  if (window.api) {
    init()
  } else {
    window.apiready = function () {
      if (window.api_loaded) return;
      init()
    }
  }

}