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
            return Recipe.find({isPublic: true});
        },
        recipes: async(parent, { username, isPublic }) => {
            if (!isPublic){
                return Recipe.find({ username });
            }
            return Recipe.find({ username, isPublic: true })
        },
        recipe: async(parent, { _id }) => {
            const recipeDetails = { recipe: {}, user: {}, cooks: {}};
            recipeDetails.recipe = await Recipe.findOne({ _id });
            const { username } = recipeDetails.recipe;
            recipeDetails.cooks = await Cook.find({ recipeId: _id })
            recipeDetails.user = await User.findOne({ username })
            return recipeDetails;
        },
        recipegroup: async(parent, { array }) => {
            return await array.map( ele => {
                return recipeData = Recipe.findOne({ _id: ele })
            });
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        updateUser: async(parent, args) => {
            const user = await User.findOneAndUpdate({_id: args.userId}, args, {new: true})
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
        signS3: async(parent, { name, type, uploadedBy, category }) => {
            let imageData = await Image.create({src: 'placeholder', uploadedBy: uploadedBy, category: category});
            const ext = name.split('.').pop();
            const fileName = `${imageData._id}.${ext}`;
            const s3 = new aws.S3();
            const s3Params = {
                Bucket: `${S3_BUCKET}/img/${category}`,
                Key: `${imageData._id}.${ext}`,
                Expires: 60,
                ContentType: type
            };
            const signedUrl = new Promise ((resolve, reject) => {
                s3.getSignedUrl('putObject', s3Params, (err, url) => { resolve(url); });
            });
            imageData = await Image.findOneAndUpdate({ _id: imageData._id }, {src: `https://${S3_BUCKET}.s3.amazonaws.com/img/${category}/${imageData._id}.${ext}`});
            const signedRequest = await signedUrl;
            return {signedRequest, url:`https://${S3_BUCKET}.s3.amazonaws.com/img/${category}/${imageData._id}.${ext}`, fileName: fileName};
        },
        updateRecipe: async(parent, args, { recipeId }) => {
            return await Recipe.findOneAndUpdate({_id: args.recipeId}, args, {new: true})
        },
        deleteRecipe: async(parent, args) => {
            return await Recipe.findOneAndDelete({_id: args._id})
        },
        addCook: async(parent, args, { recipeId }) => {
            const cookData = await Cook.create(args)
            const recipeData = await Recipe.findOneAndUpdate(recipeId , { cooks: cookData._id })
            return cookData
        },
    }
}

module.exports = resolvers;