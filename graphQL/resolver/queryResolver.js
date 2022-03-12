const pointModels = require('../../model/point');
const policyModels = require('../../model/policy');
const contextModel = require('../../model/contextModel');

module.exports = {
    RootQuery: {
        findAllPoints: async() => {
            try {
                var getPointsAllowed = [];
                var getAllPointsAllowed = [];
                
                /* search policies */
                
                const getPolicies = await policyModels.find();

                console.log(getPolicies);
               

                /* get context */
                
                const getContext = new contextModel('context01','>30','13h','0','point03','ADMIN','bedroom','18','on','30%','smartphone');
                
                /* find points that satisfy the policies*/
                
                for (const policy of getPolicies) {
                   var count=0
                   
                   if((policy.temperature == getContext.temperature) || (policy.temperature == null)) count++;
                   if((policy.hour == getContext.hour) || (policy.hour == null)) count++; 
                   if((policy.day == getContext.day) || (policy.day == null)) count++;                   
                   if((policy.role == getContext.role) || (policy.role == null)) count++; 
                   if((policy.localization == getContext.localization) || (policy.localization == null)) count++; 
                   if((policy.age == getContext.age) || (policy.age == null)) count++; 
                   if((policy.connectivity == getContext.connectivity) || (policy.connectivity == null)) count++; 
                   if((policy.battery == getContext.battery) || (policy.battery == null)) count++; 
                   if((policy.device == getContext.device) || (policy.device == null)) count++; 

                   if(count==9){

                        getPointsAllowed = await pointModels.find({name:policy.point});

                        for (const point of getPointsAllowed) {
					    getAllPointsAllowed.push(point);
                   
				        }	
                    }
                }
                //const getPoint = await pointModels.find();
                //return getPoint;

                return getAllPointsAllowed
            } catch (error) {
                return error;
            }
        },

        findAllPolicies: async() => {
            try {
                const getPolicies = await policyModels.find();
                return getPolicies;
            } catch (error) {
                return error;
            }
        }
    }
}