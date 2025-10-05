
interface restfulApi{
    baseUrl:string;
}

export const config:{ processEnv: restfulApi } = {
    processEnv: {
        baseUrl: process.env.RESTFUL_API || 'defaultAPIUrl'
    }}