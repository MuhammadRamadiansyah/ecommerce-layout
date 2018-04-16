module.exports = {
    isError: function(res, err, status){
        res.status(status).json({
            error: err.message
        })
    },
    isSuccess: function(res, result, status, message){
        res.status(status).json({
            message,
            result,
        })
    }
}