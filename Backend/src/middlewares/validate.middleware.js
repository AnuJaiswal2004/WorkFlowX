export const validate = (schema) => async (req, res, next) => {
    try {
        const parsed = await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        
        // Assign verified values back to request
        req.body = parsed.body || req.body;
        req.query = parsed.query || req.query;
        req.params = parsed.params || req.params;
        
        next();
    } catch (error) {
        next(error);
    }
};
