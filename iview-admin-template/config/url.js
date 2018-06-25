import env from './env'

const DEV_URL = 'http://localhost:4000'
const PRO_URL = 'http://localhost:4000'

export default env === 'development' ? DEV_URL : PRO_URL
