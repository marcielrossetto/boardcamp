// src/middlewares/validateSchema.middleware.js
export function validateSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const messages = error.details.map(d => d.message);
      return res.status(400).send(messages);
    }

    next();
  };
}
