class View {
  // parameter tambahkan sesuai kebutuhan
  static read(data) {
    console.log(data)
  }
  static successAddBank(data) {
    console.log(`Bank ${data.name} added successfully`)
  }
  static successDeleteBank(data) {
    console.log(`Bank with name ${data.name} deleted successfully`)
  }
  static addCustomer(data) {
    console.log(`Customer ${data.name} added successfully`)
  }

  static successDeleteCust(data) {
    console.log(`Customer with name ${data.name} deleted successfully`)
  }
}

module.exports = View