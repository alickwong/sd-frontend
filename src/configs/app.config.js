const appConfig = {
    apiPrefix: '/api',
    inferenceApiBase: 'https://xxxx.cloudfront.net/',
    // inferenceApiBase: 'http://localhost:3000/',
    webuiBasePath: 'http://k8s-xxxxx-xxxxx-xxxxx.ap-northeast-1.elb.amazonaws.com',
    authenticatedEntryPath: '/instance/list',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/',
    locale: 'en',
    enableMock: false,
}

if(process.env.NODE_ENV === 'development') {
    appConfig.inferenceApiBase = 'http://localhost:3000/';
}


export default appConfig
