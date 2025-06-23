export default function errorHandler(error, req, res, next) {
    console.log(error);
    if (error.type === "conflict"){
        return res.status(409).send(error.message);
    }
    if (error.type === "not_found") {
        return  req.status(404).send(error.message);
    }
    if (error.type === "unprocessable_entity") {
        return req.status(422).send(error.message);
    }
    if (error.type === "bad_request") {
        return res.status(400).send(error.message);
    }
    return res.status(500).sen("Internal Server Error");
}