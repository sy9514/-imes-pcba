import { parse } from 'qs'
export default function () {
  const qstr = window.location.href.split('#')
  if (qstr.length > 1) {
    const qq = qstr[1].split('?')
    const qo =
      qq.length > 1 && qq[1].indexOf('account') == -1
        ? parse(qq[1])
        : {}
    return qo.redir || 'home'
  }
  return 'home'
}