// var vm = avalon.define({
//   $id: "app",
//   name: "HUO BI",
//   list: {'btcusdt': {}, 'bchusdt': {}, 'dashusdt': {}, 'ethusdt': {}, 'zecusdt': {}, 'ltcusdt': {}, 'qtumusdt': {}}
// })
let data = []
if (localStorage.getItem('USER')) data = JSON.parse(localStorage.getItem('USER'))
let app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Huo Bi Online',
    list: [],
    usdt: ['btcusdt', 'bchusdt', 'dashusdt', 'ethusdt', 'zecusdt', 'ltcusdt', 'qtumusdt', 'xrpusdt', 'etcusdt', 'eosusdt', 'hsrusdt', 'omgusdt'],
    usd: {},
    loading: true,
    data: data,
    connectionNumber: 0,
    hlv: 6.556,
    item: {}
  },
  methods: {
    clear () {
      this.item = {}
    },
    Purchase () {
      // this.item.time = new Date().getTime()
      let myItem = {}
      for (let i in this.item) {
        myItem[i] = this.item[i]
      }
      app.data.push(myItem)
      data = app.data
      localStorage.setItem('USER', JSON.stringify(data))
      $('#myModal').modal('hide')
    },
    remove (x) {
      data[x] = null
      app.data = []
      for (let i in data) {
        if (data[i]) app.data.push(data[i])
      }
      data = app.data
      localStorage.setItem('USER', JSON.stringify(data))
    },
    calcMoney (o, n) {
      if (o) {
        let num = n.num * o - n.num * n.usdt
        return num.toFixed(4)
      }
      return ''
    },
    calcMoneyClass (o, n) {
      if (o) {
        let num = n.num * o - n.num * n.usdt
        return num > 0 ? 'success' : 'warning'
      }
      return ''
    }
  }
})
// new Vue({
//   el:'#app',
//   data: {
//     message:'Hello World!'
//   }
// });
var socket = io.connect('/');
let list = []

socket.emit('isSocketId', new Date().getTime().toString() + 'a' + parseInt(Math.random() * 9999).toString());
socket.on('connectionNumber', function (data) {
  app.connectionNumber = data
})
socket.on('news', function (data) {
  this.loading = false
  app.usd[data.name] = data.tick.close
  data.name = data.name.replace('usdt', '').toLocaleUpperCase()
  list[parseInt(data.id)] = data
  // app.list = list
  app.list = []
  for (let i in list) {
    app.list.push(list[i])
  }
  this.loading = true
  // let num = data.tick.close * a - (a * b)
  // document.getElementById('show').innerHTML = JSON.stringify(data)
  // document.getElementById('showNum').innerHTML = num.toFixed(4) + ' ---- ' + (num * 7.2).toFixed(4)
});
// vm.list.bchusdt = {id: '123123213', tick: {close: '123123'}}
// app.list = [4, 5, 6]