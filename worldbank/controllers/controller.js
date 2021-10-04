const Model = require('../models/model')
const View = require('../views/view')

class Controller {
  // parameter tambahkan sesuai kebutuhan
  static list() {
    Model.readBank((err, data) => {
      if (err) View.read(err)
      else View.read(data)
    })
  }
  static addBank(params) {
    let [name, type] = params
    Model.createBank(name, type, (err, data) => {
      if (err) View.read(err)
      else View.successAddBank(data)
    })
  }

  static deleteBank(id) {
    Model.deleteBank(id, (err, data) => {
      if (err) view.read(err)
      else View.successDeleteBank(data)
    })
  }

  static addCustomer(params) {
    let [idBank, name, ktp, depositAmount] = params
    Model.addCustomer(+idBank, name, ktp, +depositAmount, (err, data) => {
      if (err) View.read(err)
      else View.addCustomer(data)
    })
  }

  static deleteCustomer(params) {
    let [idBank, ktp] = params
    Model.deleteCustomer(+idBank, ktp, (err, data) => {
      if (err) View.read(err)
      else View.successDeleteCust(data)
    })
  }

  static detail(id) {
    Model.detail(id, (err, data) => {
      if (err) View.read(err)
      else console.table(data)
    })
  }
}

module.exports = Controller