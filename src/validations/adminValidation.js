const { body,check,query, param} = require('express-validator');

const adminLoginValidate = [
    check('email').notEmpty().withMessage("Email is required"),
    check('email').notEmpty().isEmail().withMessage('Invalid email format').custom(value => {
        if (!value.includes('@')) {
            throw new Error('Email must contain "@" symbol');
        }
        return true;
    }),
    check('password').notEmpty().withMessage("password is required"),
];

const isWordCountValid = (value) => {
    const words = value.split(/\s+/).filter(word => word.length > 0);
    return words.length <= 250;
  };
  const isWordCountValidShort = (value) => {
    const words = value.split(/\s+/).filter(word => word.length > 0);
    return words.length <= 50;
  };

const createTourValidation = [
    check('short_description').notEmpty().withMessage("Short Description is required").custom(isWordCountValidShort).withMessage('Short Description must not exceed 50 words'),
    check('long_description').notEmpty().withMessage("Long Description is required").custom(isWordCountValid).withMessage('Long Description must not exceed 250 words'),
    check('about_trip').notEmpty().withMessage("About Trip is required"),
    check('what_include').notEmpty().withMessage("What Include is required"),
    check('images').custom((images, { req }) => {
        if (!images || !Array.isArray(images) || images.length < 5 || images.length > 12) {
            throw new Error('You must provide between 5 and 12 images of the jet.');
        }
        return true;
    }).withMessage('You must provide between 5 and 12 images of the jet.'),
    check('jet_type').notEmpty().withMessage("Jet Type is required"),
    check('tour_title').notEmpty().withMessage("Tour Title is required"),
    check('pickup_vehicle').notEmpty().withMessage("Pickup Vehicle is required"),
    check('tour_location.from').notEmpty().withMessage("Tour Location From is required"),
    check('tour_location.to').notEmpty().withMessage("Tour Location To is required"),
    check('hotel').notEmpty().withMessage("Hotel is required"),
];
  
const updateTourValidation = [
    check('short_description').notEmpty().withMessage("Short Description is required").custom(isWordCountValidShort).withMessage('Short Description must not exceed 250 words'),
    check('long_description').notEmpty().withMessage("Long Description is required").custom(isWordCountValid).withMessage('Long Description must not exceed 250 words'),
    check('about_trip').notEmpty().withMessage("About Trip is required"),
    check('what_include').notEmpty().withMessage("What Include is required"),
    check('images').custom((images, { req }) => {
        if (!images || !Array.isArray(images) || images.length < 5 || images.length > 12) {
            throw new Error('You must provide between 5 and 12 images of the jet.');
        }
        return true;
    }).withMessage('You must provide between 5 and 12 images of the jet.'),
    check('jet_type').notEmpty().withMessage("Jet Type is required"),
    check('tour_title').notEmpty().withMessage("Tour Title is required"),
    check('pickup_vehicle').notEmpty().withMessage("Pickup Vehicle is required"),
    check('tour_location.from').notEmpty().withMessage("Tour Location From is required"),
    check('tour_location.to').notEmpty().withMessage("Tour Location To is required"),
    check('hotel').notEmpty().withMessage("Hotel is required"),
];
  
const createContentValidation = [
    check('title').notEmpty().withMessage("title is required"),
    check('type').notEmpty().withMessage("type is required"),
    check('content').notEmpty().withMessage("content is required"),
];


const createSectionFirstAboutValidation = [
    // check('a_heading').notEmpty().withMessage("heading is required"),
    check('a_paragraph').notEmpty().withMessage("paragraph is required"),
    check('a_image').notEmpty().withMessage("image is required"),
];

const createSectionSecondAboutValidation = [
    check('b_heading').notEmpty().withMessage("heading is required"),
    check('b_paragraph').notEmpty().withMessage("paragraph is required"),
    check('b_image').notEmpty().withMessage("image is required"),
];

const createSectionThirdAboutValidation = [
    check('c_heading').notEmpty().withMessage("heading is required"),
    check('c_paragraph').notEmpty().withMessage("paragraph is required"),
    check('c_image').notEmpty().withMessage("image is required"),
];

const createClientValidation = [
    check('client_name').notEmpty().withMessage("client_name is required"),
    check('client_post').notEmpty().withMessage("client_post is required"),
    check('image').notEmpty().withMessage("image is required"),
];


const updateClientValidation = [
    check('client_name').notEmpty().withMessage("client_name is required"),
    check('client_post').notEmpty().withMessage("client_post is required"),
    check('image').notEmpty().withMessage("image is required"),
];

const createFaqValidation = [
    check('question').notEmpty().withMessage("question is required"),
    check('answer').notEmpty().withMessage("answer is required"),
];
const updateFaqValidation = [
    check('question').notEmpty().withMessage("question is required"),
    check('answer').notEmpty().withMessage("answer is required"),
];

module.exports = {
    adminLoginValidate,
    createTourValidation,
    updateTourValidation,
    createContentValidation,
    createClientValidation,
    updateClientValidation,
    createSectionFirstAboutValidation,
    createSectionSecondAboutValidation,
    createSectionThirdAboutValidation,
    createFaqValidation,
    updateFaqValidation
}