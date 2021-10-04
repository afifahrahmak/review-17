const fs = require('fs')
const { Factory, Customer } = require('./class')

class Model {
  // parameter tambahkan sesuai kebutuhan
  static readBank(cb) {
    fs.readFile('./data.json', 'utf-8', (err, data) => {
      if (err) cb(err)
      else {
        data = JSON.parse(data)
        data = data.map(bank => {
          let instancesCustomer = bank.customers.map(el => {
            return new Customer(el.name, el.ktp, el.depositAmount)
          })
          let instanceBank = Factory.createBank(bank.type, bank.id, bank.name, instancesCustomer)
          return instanceBank
        })
        cb(null, data)
      }
    })
  }

  static saveJSON(data, cb) {
    //edit dulu, sesuaikan datanya
    let newData = data.map(bank => {
      delete bank.limit
      bank.customers = bank.customers.map(cust => {
        return {
          name: cust.name,
          ktp: cust.ktp,
          depositAmount: cust.depositAmount
        }
      })
      return bank
    })

    fs.writeFile('./data.json', JSON.stringify(newData, null, 2), (err) => {
      cb(err)
    })
  }

  static createBank(name, type, cb) {
    Model.readBank((err, data) => {
      if (err) cb(err)
      else {
        let id = data[data.length - 1].id + 1
        let newBank = Factory.createBank(type, id, name)
        data.push(newBank)
        Model.saveJSON(data, (err) => {
          if (err) cb(err)
          else cb(null, newBank)
        })
      }
    })
  }

  static deleteBank(id, cb) {
    Model.readBank((err, data) => {
      if (err) cb(err)
      else {
        let foundBank = data.find(el => el.id === id)
        data = data.filter(el => el.id !== id) // otomatis kehapus
        Model.saveJSON(data, (err) => {
          if (err) cb(err)
          else cb(null, foundBank)
        })
      }
    })
  }

  static addCustomer(idBank, name, ktp, depositAmount, cb) {
    Model.readBank((err, data) => {
      if (err) cb(err)
      else {
        let foundBank = null
        let createdCustomer = null
        data.forEach(bank => {
          if (bank.id == idBank) {
            foundBank = bank
            if (bank.limit < bank.customers.length) {
              createdCustomer = new Customer(name, ktp, depositAmount)
              bank.customers.push(createdCustomer)
            }
          }
        })
        if (foundBank) {
          if (createdCustomer) {
            Model.saveJSON(data, (err) => {
              if (err) cb(err)
              else cb(null, createdCustomer)
            })
          } else {
            cb('You can not add more cust to this bank!')
          }
        } else {
          cb(`Bank with id ${idBank} is not found`)
        }
      }
    })
  }

  static deleteCustomer(idBank, ktp, cb) {
    Model.readBank((err, data) => {
      if (err) cb(err)
      else {
        let foundBank = null
        let deletedCust = null
        data = data.map(bank => {
          if (bank.id == idBank) {
            foundBank = bank
            deletedCust = bank.customers.find(el => el.ktp === ktp)
            bank.customers = bank.customers.filter(el => el.ktp !== ktp)
          }
          return bank
        })
        if (foundBank) {
          if (deletedCust) {
            Model.saveJSON(data, (err) => {
              if (err) cb(err)
              else cb(null, deletedCust)
            })
          } else {
            cb(`Customer with ktp ${ktp}  is not found`)
          }
        } else {
          cb(`Bank with id ${idBank} is not found`)
        }
      }
    })
  }

  static detail(id, cb) {
    Model.readBank((err, data) => {
      if (err) cb(err)
      else {
        let foundBank = data.find(el => el.id == id)
        if (foundBank) {
          foundBank.customers = foundBank.customers.map(cust => {
            return {
              name: cust.name,
              ktp: cust.ktp,
              depositAmount: cust.depositAmount
            }
          })
          cb(null, foundBank.customers)
        } else {
          cb(`Bank with id ${id} is not found`)
        }
      }
    })
  }
}

module.exports = Model