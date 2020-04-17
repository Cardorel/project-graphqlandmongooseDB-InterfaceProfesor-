const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt,
    GraphQLID,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');


const SetAddress = require('../mongooseDB/Schema/address');
const SetGroup = require('../mongooseDB/Schema/group');
const SetSemester= require('../mongooseDB/Schema/semester');


const AddressType = new GraphQLObjectType({
    name: "Address",
    fields: () => ({
        _id : {type : GraphQLID},
        name : {type : GraphQLString},
        firstname : {type : GraphQLString},
        birthday : {type: GraphQLString},
        class: {
            type: semesterType,
            resolve(parent , args){
                return SetSemester.findById(parent.classID);
            }
        },
        group : {
            type: groupType,
            resolve(parent , args){             
               return SetGroup.findById(parent.groupID);
            }
        },
        start : {type: GraphQLInt},
        end : {type: GraphQLInt},
        reactJS: {type: GraphQLFloat},
        vueJS: {type: GraphQLFloat},
        angularJS: {type: GraphQLFloat},
        nodeJS : {type: GraphQLFloat},
        PHP : {type: GraphQLFloat},
        dotNet: {type: GraphQLFloat}
    })
});

const semesterType= new GraphQLObjectType({
    name: "Semester",
    fields: () => ({
        _id: {type: GraphQLID},
        semester: {type: GraphQLInt}
    })
})

const groupType = new GraphQLObjectType({
    name: "group",
    fields: () => ({
        _id: {type: GraphQLID},
        group: {type: GraphQLString}
    })
})

/* const FrontendType = new GraphQLObjectType({
    name: "Frontend",
    fields: () => ({
        _id : {type : GraphQLID},
        reactJS: {type: GraphQLFloat},
        vueJS: {type: GraphQLFloat},
        angularJS: {type: GraphQLFloat}
    })
}) */

/* const BackendType = new GraphQLObjectType({
    name: 'Backend',
    fields: () => ({
        _id : {type : GraphQLID},
        nodeJS : {type: GraphQLFloat},
        PHP : {type: GraphQLFloat},
        dotNet: {type: GraphQLFloat}
    })
}) */


const Rootquery = new GraphQLObjectType({
    name: 'query',
    fields: {
        Address : {
            type: AddressType,
            args: {
                _id: {type : GraphQLID}
            },
            resolve(parent , args){
                //return single Address
                return SetAddress.findById(args._id);
            }
        },
        Semester: {
            type: semesterType,
            args: {
                _id: {
                    type: GraphQLID
                }
            },
            resolve(parent , args){
                return SetSemester.findById(args._id);
            }
        },
        Group: {
           type: groupType,
           args: {
               _id: {
                   type: GraphQLID
               }
           },
           resolve(parent , args){
               return SetGroup.findById(args._id);
           }
        },
        Groups: {
             type: new GraphQLList(groupType),
             resolve(parent , args){
                return SetGroup.find({});
             }
        },
        Semesters: {
            type: new GraphQLList(semesterType),
            resolve(parent , args){
                return SetSemester.find({});
            }
        },
        AllAddress : {
            type: new GraphQLList(AddressType),
            resolve(parent , args){
                //Return all Contact
                return SetAddress.find({});
            }
        },
    }
})

                                             /* Mutation */               

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAddress: {
            type: AddressType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                firstname: { type: new GraphQLNonNull(GraphQLString)},
                birthday: { type: new GraphQLNonNull(GraphQLString)},
                classID: { type: new GraphQLNonNull(GraphQLString)},
                groupID: { type: new GraphQLNonNull(GraphQLString)},
                start: { type: new GraphQLNonNull(GraphQLInt)},
                end: { type: new GraphQLNonNull(GraphQLInt)},
                reactJS: {type: new GraphQLNonNull(GraphQLFloat)},
                vueJS: {type: new GraphQLNonNull(GraphQLFloat)},
                angularJS: {type: new GraphQLNonNull(GraphQLFloat)},
                nodeJS : {type: new GraphQLNonNull(GraphQLFloat)},
                PHP : {type: new GraphQLNonNull(GraphQLFloat)},
                dotNet: {type: new GraphQLNonNull(GraphQLFloat)}
                
            },
            resolve(parent,args){
                //return the Front end schema of mongoose DB
                let address = new SetAddress({
                    name : args.name,
                    firstname : args.firstname,
                    birthday : args.birthday,
                    classID : args.classID,
                    groupID : args.groupID,
                    start : args.start,
                    end : args.end,
                    reactJS: args.reactJS,
                    vueJS: args.vueJS,
                    angularJS: args.angularJS,
                    nodeJS: args.nodeJS,
                    PHP: args.PHP,
                    dotNet: args.dotNet
                });
                return address.save();
            }
        },
        addGroup: {
            type: groupType,
            args: {
                group: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent , args){
                let GROUP = new SetGroup({
                    group: args.group
                });
                return GROUP.save();
            }
        },
        addSemester: {
            type: semesterType,
            args: {
                semester: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent , args){
                let SEMESTER = new SetSemester({
                    semester: args.semester
                })
                return SEMESTER.save();
            }
        }
    }
});

const schema = new GraphQLSchema({
    mutation: Mutation,
    query: Rootquery
})

module.exports = schema;