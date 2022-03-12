/* building GraphQL Schema */
module.exports = `
type pointData {
    _id: ID!
    name: String!
    typepoint: String!
    value: String!
}

input pointInput{
    name: String!
    typepoint: String!
    value: String!
}

type policyData {
    _id: ID!
    name: String!
    temperature: String!
    hour: String!
    day: String!
    point: String!
    role: String!	
	localization: String!
    age: String!
    connectivity: String!
    battery: String!
    device: String!
}

input policyInput{
    name: String!
    temperature: String!
    hour: String!
    day: String!
    point: String!
    role: String!	
	localization: String!
    age: String!
    connectivity: String!
    battery: String!
    device: String!
}

type RootQuery {
    findAllPoints: [pointData!]!
    findAllPolicies: [policyData!]!
}

type DeleteRes{
    response:String!
}
type RootMutation {
    createPoint(newPoint: pointInput): pointData!
    deletePoint(pointname: String!): DeleteRes!

    createPolicy(newPolicy: policyInput): policyData!
    deletePolicy(policyname: String!): DeleteRes!
}

type Subscription{
    point: [pointData!]!
}

schema {
    query: RootQuery
    mutation: RootMutation
    subscription: Subscription
}
`;