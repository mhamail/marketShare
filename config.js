
// import nextConfig from './next.config'




// export const APP_NAME = nextConfig.APP_NAME;
// export const API = nextConfig.DOMAIN;
// export const GOOGLE_APP_ID = "123";
// export const MY_PHONE = nextConfig.SHARE_NUMBER;
// export const MY_PHONE2=""

//production
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;
export const API = process.env.NEXT_PUBLIC_API_PRODUCTION;
export const GOOGLE_APP_ID = "1234";
export const MY_PHONE = process.env.NEXT_PUBLIC_SHARE_NUMBER.toString();
export const MY_PHONE2 = process.env.NEXT_PUBLIC_SHARE_NUMBER.toString();





