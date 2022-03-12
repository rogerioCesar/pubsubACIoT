const pointModels = require('../../model/point');
const policyModels = require('../../model/policy');
const contextModel = require('../../model/contextModel');
const { pubsub } = require('../helper');

module.exports = {
    RootMutation: {
        createPoint: async(parent, args, ctx, info) => {
            try {
                
                var getPointsAllowed = [];
                var getAllPointsAllowed = [];

                let query = { 'name': args.newPoint.name };
                
                const createPointDetails = await pointModels.findOneAndUpdate(query, args.newPoint, { upsert: true, new: true });
                
                console.log('point create===============', createPointDetails);
                
                /* search policies */
                
                const getPolicies = await policyModels.find();
               

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
                pubsub.publish('pointTopic', {
                    point: getAllPointsAllowed
                });
                return createPointDetails;
            } catch (error) {
                return error;
            }
        },
        createPolicy: async(parent, args, ctx, info) => {
            try {
                console.log('policy create===============', args);
                let query = { 'name': args.newPolicy.name };
                const createPolicyDetails = await policyModels.findOneAndUpdate(query, args.newPolicy, { upsert: true, new: true });
                console.log('policy create===============', createPolicyDetails);
                /*public on pubsub
                pubsub.publish('pointTopic', {
                    point: createPointDetails
                });*/
                return createPolicyDetails;
            } catch (error) {
                return error;
            }
        },

        deletePoint: async(parent, args, ctx, info) => {
            let responseMSG = {};
            try {
                let query = { 'name': args.name };
                const createPointDetails = await pointModels.findOneAndDelete(query);
                console.log('createPointDetails--------------------', createPointDetails);
                if (createPointDetails == null) {
                    responseMSG.response = "No Point found for this operation";
                    return responseMSG;
                } else {
                    responseMSG.response = "Success";
                    return responseMSG;
                }
            } catch (error) {
                responseMSG.response = "Fail";
                return responseMSG;
            }
        }
    }
}