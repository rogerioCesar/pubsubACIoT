/* defining context model  */

module.exports = class ContextModel{    
    
    constructor(name,temperature,hour,day,point, role, localization, age, connectivity, battery, device) {
        this.name = name;
        this.temperature = temperature
        this.hour = hour;
        this.day = day
        this.point = point;
        this.role = role;
        this.localization = localization;
        this. age = age;
        this.connectivity = connectivity;
        this.battery = battery;
        this.device = device;           
    }   
    
}