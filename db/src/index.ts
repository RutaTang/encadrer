import { AppDataSource } from "./data-source"
AppDataSource.initConfig({})

AppDataSource.getInstance().initialize().then(async () => {

}).catch(error => console.log(error))
