const { Image, User, Recipe, Cook } = require('../models/');
const {AuthenticationError} = require('apollo-server-express');
const { GraphQLUpload } = require('graphql-upload');
const { finished } = require('stream/promises');
const path = require('path');
const fs = require('fs');
const {signToken} = require('../utils/auth');
const { aws, S3_BUCKET } = require('../config/aws');

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
        },
        allrecipes: async() => {
            return Recipe.find();
        },
        recipes: async(parent, { username }) => {
            // const recipeData = await Recipe.find({ username });
            return Recipe.find({ username });
        },
        recipe: async(parent, { _id }) => {
            const recipeDetails = { recipe: {}, user: {}};
            recipeDetails.recipe = await Recipe.findOne({ _id });
            const { username } = recipeDetails.recipe;
            recipeDetails.user = await User.findOne({ username })
            return recipeDetails;
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        updateUser: async(parent, args, { _id }) => {
            const user = await User.findOneAndUpdate(_id, args, {new: true})
            const token = signToken(user);

            return { token, user};
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
        imageUpload: async(parent, { image, uploadedBy, category }) => {
            const { createReadStream, filename, mimetype, encoding } = await image;
            let newImage = await Image.create({src: 'placeholder', uploadedBy: uploadedBy, category: category});
            const stream = createReadStream();
            let ext = filename.split('.').pop();
            let pathName = `./public/assets/img/${category}/${newImage._id}.${ext}`;
            await stream.pipe(fs.createWriteStream(pathName))
            let src = `/assets/img/${category}/${newImage._id}.${ext}`;
            newImage = await Image.findOneAndUpdate({ _id: newImage._id }, {src: src}, {new: true})
            return newImage;
        },
        addRecipe: async(parent, args) => {
            const recipe = await Recipe.create(args);
            return recipe;
        },
        addCook: async(parent, args) => {
            const cook = await Cook.create(args);
            return cook;
        },
        signS3: async(parent, { name, type, uploadedBy, category }) => {
            let imageData = await Image.create({src: 'placeholder', uploadedBy: uploadedBy, category: category});
            const ext = name.split('.').pop();
            const fileName = `${imageData._id}.${ext}`;
            const s3 = new aws.S3();
            const s3Params = {
                Bucket: `${S3_BUCKET}/img/${category}/`,
                Key: `${imageData._id}.${ext}`,
                Expires: 60,
                ContentType: type
            };
            const signedUrl = new Promise ((resolve, reject) => {
                s3.getSignedUrl('putObject', s3Params, (err, url) => { resolve(url); });
            });
            imageData = await Image.findOneAndUpdate({ _id: imageData._id }, {src: `https://${S3_BUCKET}.s3.amazonaws.com/img/${category}/${imageData._id}`});
            const signedRequest = await signedUrl;
            return {signedRequest, url:`https://${S3_BUCKET}.s3.amazonaws.com/img/${category}/${imageData._id}`, fileName: fileName};
        },
    }
}

module.exports = resolvers;