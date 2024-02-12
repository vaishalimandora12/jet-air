const { body,check,query, param} = require('express-validator');

const isWordCountValid = (value) => {
  const words = value.split(/\s+/).filter(word => word.length > 0);
  return words.length <= 250;
};

const ContactUsValidate = [
    check('first_name').notEmpty().withMessage("First Name is required"),
    check('last_name').notEmpty().withMessage("Last Name is required"),
    check('email').notEmpty().withMessage("Email is required"),
    check('email').notEmpty().isEmail().withMessage('Invalid email format').custom(value => {
        if (!value.includes('@')) {
            throw new Error('Email must contain "@" symbol');
        }
        return true;
    }),
    check('phone_number').notEmpty().withMessage("Phone_number is required"),
    check('description').notEmpty().withMessage("Description is required")
    .custom(isWordCountValid).withMessage('Description must not exceed 250 words'),
    check('country_code').notEmpty().withMessage("Country code is required"),
];

const TourEnqiryValidate = [
    check('first_name').notEmpty().withMessage("First Name is required"),
    check('last_name').notEmpty().withMessage("Last Name is required"),
    check('email').notEmpty().withMessage("Email is required"),
    check('email').notEmpty().isEmail().withMessage('Invalid email format').custom(value => {
        if (!value.includes('@')) {
            throw new Error('Email must contain "@" symbol');
        }
        return true;
    }),
    check('phone_number').notEmpty().withMessage("Phone_number is required"),
    check('description').notEmpty().withMessage("Description is required")
    .custom(isWordCountValid).withMessage('Description must not exceed 250 words'),
    check('country_code').notEmpty().withMessage("Country code is required"),
    check('jet_type').notEmpty().withMessage("jet_type is required"),
    check('tour_title').notEmpty().withMessage("tour_title is required"),
    check('pickup_vehicle').notEmpty().withMessage("pickup_vehicle is required"),
    // check('pickup_location').notEmpty().withMessage("pickup_location is required"),
];

const SellJetValidate = [
    check('first_name').notEmpty().withMessage("First Name is required"),
    check('last_name').notEmpty().withMessage("Last Name is required"),
    check('email').notEmpty().withMessage("Email is required"),
    check('email').notEmpty().isEmail().withMessage('Invalid email format').custom(value => {
        if (!value.includes('@')) {
            throw new Error('Email must contain "@" symbol');
        }
        return true;
    }),
    check('phone_number').notEmpty().withMessage("Phone_number is required"),
    check('description').notEmpty().withMessage("Description is required")
    .custom(isWordCountValid).withMessage('Description must not exceed 250 words'),
    check('country_code').notEmpty().withMessage("Country code is required"),
    check('aircraft_name').notEmpty().withMessage("aircraft_name is required"),
    check('aircraft_category').notEmpty().withMessage("aircraft_category is required"),
    check('highlights').notEmpty().withMessage("highlights is required"),
    check('airframe').notEmpty().withMessage("airframe is required"),
    check('aircraft_service_changes').notEmpty().withMessage("aircraft_service_changes is required"),
    check('interior').notEmpty().withMessage("interior is required"),
    check('images').custom((images, { req }) => {
            if (!images || !Array.isArray(images) || images.length < 5 || images.length > 12) {
                throw new Error('You must provide between 5 and 12 images of the jet.');
            }
            return true;
        })
        .withMessage('You must provide between 5 and 12 images of the jet.'),

    check('engine_detail_pdf').notEmpty().withMessage("engine_detail_pdf is required"),
    check('floor_plan').notEmpty().withMessage("floor Plan is required"),
    check('apu_pdf').notEmpty().withMessage("apu_pdf is required"),
    check('avionics').notEmpty().withMessage("avionics is required"),
];

const BuyJetValidate = [
    check('possess_jet').notEmpty().withMessage('possess_jet is required'),
    check('first_name')
      .if((value, { req }) => req.body.possess_jet === 'no')
      .notEmpty()
      .withMessage('First Name is required'),
    check('last_name')
      .if((value, { req }) => req.body.possess_jet === 'no')
      .notEmpty()
      .withMessage('Last Name is required'),
    check('email')
      .if((value, { req }) => req.body.possess_jet === 'no')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email format')
      .custom(value => {
        if (!value.includes('@')) {
          throw new Error('Email must contain "@" symbol');
        }
        return true;
      }),
    check('phone_number')
      .if((value, { req }) => req.body.possess_jet === 'no')
      .notEmpty()
      .withMessage('Phone_number is required'),
    check('description')
      .if((value, { req }) => req.body.possess_jet === 'no')
      .notEmpty()
      .withMessage('Description is required').custom(isWordCountValid)
      .withMessage('Description must not exceed 250 words'),
    check('country_code')
      .if((value, { req }) => req.body.possess_jet === 'no')
      .notEmpty()
      .withMessage('Country code is required'),
    check('maintenance')
      .if((value, { req }) => req.body.possess_jet === 'yes')
      .notEmpty()
      .withMessage('Maintenance is required'),
    check('aircraft_name')
      .if((value, { req }) => req.body.possess_jet === 'yes')
      .notEmpty()
      .withMessage('Aircraft name is required'),
      check('aircraft_category')
      .if((value, { req }) => req.body.possess_jet === 'yes')
      .notEmpty()
      .withMessage('aircraft_category is required'),
      check('highlights')
      .if((value, { req }) => req.body.possess_jet === 'yes')
      .notEmpty()
      .withMessage('highlights is required'),
      check('airframe')
      .if((value, { req }) => req.body.possess_jet === 'yes')
      .notEmpty()
      .withMessage('airframe is required'),
      check('aircraft_service_changes')
      .if((value, { req }) => req.body.possess_jet === 'yes')
      .notEmpty()
      .withMessage('aircraft_service_changes is required'),
      check('interior')
      .if((value, { req }) => req.body.possess_jet === 'yes')
      .notEmpty()
      .withMessage('interior is required'),
      check('images')
      .if((value, { req }) => req.body.possess_jet === 'yes')
      .custom((images, { req }) => {
       if (!images || !Array.isArray(images) || images.length < 5 || images.length > 12) {
       throw new Error('You must provide between 5 and 12 images of the jet.');
       }
       return true;
       })
      .withMessage('You must provide between 5 and 12 images of the jet.'),
      // check('floor_plan').notEmpty().withMessage("floor Plan is required"),
      check('floor_plan')
      .if((value,{req})=>req.body.possess_jet==='yes')
      .notEmpty()
      .withMessage('floor_plan is required'),
      check('engine_detail_pdf')
      .if((value, { req }) => req.body.possess_jet === 'yes')
      .notEmpty()
      .withMessage('engine_detail_pdf is required'),
      check('apu_pdf')
      .if((value, { req }) => req.body.possess_jet === 'yes')
      .notEmpty()
      .withMessage('apu_pdf is required'),
      check('avionics')
      .if((value, { req }) => req.body.possess_jet === 'yes')
      .notEmpty()
      .withMessage('avionics is required'), 
  ];

  const OtpValidate = [
    check('otp').notEmpty().withMessage("otp is required"),
    check('email').notEmpty().withMessage("Email is required"),
];
  

module.exports = {
    ContactUsValidate,
    TourEnqiryValidate,
    BuyJetValidate,
    SellJetValidate,
    OtpValidate
}  