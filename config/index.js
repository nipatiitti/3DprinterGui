import dotenv from 'dotenv'

dotenv.config()

export default {
    app:            process.env.APP             || 'dev',
    port:           process.env.PORT            || '5000',
    db_dialect:     process.env.DB_DIALECT      || 'mongo',
    db_host:        process.env.DB_HOST         || 'localhost',
    db_port:        process.env.DB_PORT         || '27017',
    db_name:        process.env.DB_NAME         || '3dprinter',
    db_user:        process.env.DB_USER         || 'root',
    db_password:    process.env.DB_PASSWORD     || 'root',
    jwt_encryption: process.env.JWT_ENCRYPTION  || 'superSecretEncryptionSeed',
    jwt_expiration: process.env.JWT_EXPIRATION  || '10000'
}
