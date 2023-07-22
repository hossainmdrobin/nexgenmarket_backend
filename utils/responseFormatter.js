exports.success = (message,data) => {
    return {
        success:true,
        message,
        data
    }
}

exports.fail = (message, statusCode) => {
    return {
        success: false,
        message,
        statusCode: statusCode || 500
    }
}