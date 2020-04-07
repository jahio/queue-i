//
// AppUtils.js
//   Various utilities used in development of the app.
//

/* eslint-disable */

var AppUtils = {}

// var infoStyles = 'color: #aaa;'
// var warnStyles = 'color: #3a79e8;'
// var fatalStyles = 'color: #fff; background-color: #cc0000;'


['info', 'warn', 'fatal'].forEach((level) => {
  AppUtils[level + 'Log'] = new Function('msg', 'if (/localhost/i.test(window.location.href)) { console.log(msg) }' )
})

console.log(AppUtils)

export default {
  infoLog: msg => {
    AppUtils.infoLog(msg)
  },
  warnLog: msg => {
    AppUtils.warnLog(msg)
  },
  fatalLog: msg => {
    AppUtils.fatalLog(msg)
  }
}

// function devLog(msg) {
//   if (/localhost/i.test(window.location.href)) {
//     console.log(`%c[DEV LOG]: ${msg}`, infoStyles)
//   }
// }

// function fatalLog(msg) {
//   console.log(`%c[FATAL ERROR]: ${msg}`, fatalStyles)
// }

// export { AppUtils.infoLog }

/* eslint-enable */
