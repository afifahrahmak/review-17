const command = process.argv[2]
const params = process.argv.slice(3)
const Controller = require('./controllers/controller')

switch (command) {
    case 'list':
        Controller.list()
        break;
    case 'addBank':
        Controller.addBank(params)
        break;
    case 'deleteBank':
        Controller.deleteBank(+params[0])
        break;
    case 'addCustomer':
        Controller.addCustomer(params)
        break;
    case 'deleteCustomer':
        Controller.deleteCustomer(params)
        break;
    case 'detail':
        Controller.detail(+params[0])
        break;
    default:
        break;
}
