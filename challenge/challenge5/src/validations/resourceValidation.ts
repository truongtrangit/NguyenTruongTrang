import Joi from "joi";

export const createResourceValidation = Joi.object({
  slug: Joi.string()
    .regex(/^[a-z_][a-z0-9_]*$/)
    .required(),
  name: Joi.string().required(),
  description: Joi.string().optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  priority: Joi.string().valid("low", "medium", "high").default("medium"),
  isActive: Joi.boolean().default(true),
});

export const updateResourceValidation = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  priority: Joi.string().valid("low", "medium", "high").optional(),
  isActive: Joi.boolean().optional(),
});
