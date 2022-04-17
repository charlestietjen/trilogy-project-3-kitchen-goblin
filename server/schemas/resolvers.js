const { Image, User, Recipe, Cook } = require('../models/');
const {AuthenticationError} = require('apollo-server-express');
const { GraphQLUpload } = require('graphql-upload');
const { finished } = require('stream/promises');
const path = require('path');
const fs = require('fs');
const {signToken} = require('../utils/auth');

const resolvers = {
    Upload: GraphQLUpload,
    Query: {
        images: async () => {
            return Image.find()
        },
        users: async() => {
            return User.find()
            .select('-__v -password');
        },
        user: async(parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password');
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Username or password incorrect');
            }
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Username or password incorrect');
            }
            const token = signToken(user);
            return { token, user };
        },
        singleUpload: async(parent, { image, uploadedBy }) => {
            const { createReadStream, filename, mimetype, encoding } = await image;
            const stream = createReadStream();
            const date = new Date.now
            const pathName = `./uploads/${date}${filename}`
            await stream.pipe(fs.createWriteStream(pathName))
            const newImage = await Image.create({src:pathName, uploadedBy: uploadedBy});

            return newImage;
        },
        addRecipe: async(parent, args) => {
            const recipe = await Recipe.create(args);
            return recipe;
        },
        addCook: async(parent, args) => {
            const cook = await Cook.create(args);
            return cook;
        }
    }
}

module.exports = resolvers;