const z = require("zod");

const userSchema = z.object({
  name: z.string({
    invalid_type_error: "Name must be a string",
    required_error: "Name is required",
  }),
  email: z.string({
    invalid_type_error: "Email must be a string",
    required_error: "Email is required",
  }),
  isMedic: z.boolean({
    invalid_type_error: "isMedic must be a boolean",
    required_error: "isMedic is required",
  }).default(false),
  medicGroup: z
    .number({
      invalid_type_error: "medicGroup must be a number",
      required_error: "medicGroup is required",
    })
    .int()
    .min(1)
    .max(10),
});

function validateUser(object) {
  return userSchema.safeParse(object);
}

function validatePartialUser(object) {
  return userSchema.partial().safeParse(object);
}

module.exports = {
  validateUser,
  validatePartialUser
};
