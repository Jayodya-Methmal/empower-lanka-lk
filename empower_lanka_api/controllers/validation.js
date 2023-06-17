import Joi from "joi";

export const registerValidation = (data) => {
  const schema = Joi.object({
    // common validations
    roll: Joi.string()
      .valid("customer", "startup", "existing", "distributor", "consultant")
      .required(),
    username: Joi.string().alphanum().min(3).max(40).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .min(5)
      .required(),
    telephone: Joi.string().pattern(new RegExp("^[0-9]{10}$")).required(),
    name: Joi.string().required(),
    Paddress: Joi.string().required(),

    // startup validations
    nic: Joi.when("roll", {
      is: "startup",
      then: Joi.string().min(10).max(12).required(),
    }),
    ex_category: Joi.when("roll", {
      is: "startup",
      then: Joi.string().required(),
    }),
    area: Joi.when("roll", {
      is: "startup",
      then: Joi.string().max(128).required(),
    }),

    // existing validations
    category: Joi.when("roll", {
      is: "existing",
      then: Joi.string().required(),
    }),
    businessName: Joi.when("roll", {
      is: "existing",
      then: Joi.string().max(40).required(),
    }),
    regNo: Joi.when("roll", {
      is: "existing",
      then: Joi.string().min(6).max(20).required(),
    }),
    address: Joi.when("roll", {
      is: "existing",
      then: Joi.string().max(128).required(),
    }),

    // consultant validations
    qualification: Joi.when("roll", {
      is: "consultant",
      then: Joi.string().min(5).max(128).required(),
    }),
    consultationFee: Joi.when("roll", {
      is: "consultant",
      then: Joi.number().precision(2).positive().max(10000).required(),
    }),
    institute: Joi.when("roll", {
      is: "consultant",
      then: Joi.string().max(40).required(),
    }),
    experiences: Joi.when("roll", {
      is: "consultant",
      then: Joi.string().max(256).required(),
    }),

    // distributor validations
    driveLicNo: Joi.when("roll", {
      is: "distributor",
      then: Joi.string().min(10).max(40).required(),
    }),
    vehicleType: Joi.when("roll", {
      is: "distributor",
      then: Joi.string().required(),
    }),
    vehicleNo: Joi.when("roll", {
      is: "distributor",
      then: Joi.string().required(),
    }),
  });

  return schema.validate(data);
};

export const switchValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().allow(""),
    email: Joi.string().email().allow(""),
    paddress: Joi.string().allow(""),
    telephone: Joi.string().allow(""),
    category: Joi.string().required(),
    businessName: Joi.string().max(40).required(),
    regNo: Joi.string().min(6).max(20).required(),
    address: Joi.string().max(128).required(),
    description: Joi.string().allow(""),
  });

  return schema.validate(data);
};

export const updateValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    paddress: Joi.string().required(),
    telephone: Joi.string().min(10).max(10).required(),
    category: Joi.string().allow(""),
    businessName: Joi.string().max(40).allow(""),
    regNo: Joi.string().min(6).max(20).allow(""),
    address: Joi.string().max(128).allow(""),
    description: Joi.string().allow(""),
  });

  return schema.validate(data);
};

export const validateValues = (values) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().valid(
      'electronics',
      'clothing',
      'beauty',
      'Beauty & Personal Care',
      'Sports & Fitness',
      'Books & Stationery',
      'Toys & Games',
      'Health & Wellness',
      'Automotive'
    ).required(),
    desc: Joi.string().min(10).required(),
    imageurl: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().min(6).required(),
  });

  const { error } = schema.validate(values);

  if (error) {
    return error.details[0].message;
  }

  return null; // Return null if there are no validation errors
};






