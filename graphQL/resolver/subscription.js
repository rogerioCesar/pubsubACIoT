const { pubsub } = require('../helper');
module.exports = {
    Subscription: {
        point: {
            subscribe(parent, args, ctx, info) {
                return pubsub.asyncIterator('pointTopic') //Topic
            }
        }
    }
}