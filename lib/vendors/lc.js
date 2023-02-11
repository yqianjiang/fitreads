import LC from "leancloud-storage";

LC.init({
  appId: process.env.NEXT_PUBLIC_LC_APPID || '',
  appKey: process.env.NEXT_PUBLIC_LC_APPKEY || '',
  serverURL: process.env.NEXT_PUBLIC_LC_URL || '',
});

export default LC;
