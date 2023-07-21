exports.getDB = () => {
    if(process.env.NODE_ENV) return process.env.DB_URL_DEV
    return process.env.DB_URL_PROD
}