import Cookies from 'js-cookie';

export const setCookiesSession = (cookieName, authToken, expiryTime) => {
  // const secondsInMinute = expiryTime / 60;
  // const in120Minutes = secondsInMinute / 1440;
  Cookies.set(cookieName, authToken, {
    expires: expiryTime,
    // domain: process.env.REACT_APP_COOKIE_DOMAIN,
  });
};

export const deleteCookie = (cookieName) => {
  Cookies.remove(cookieName);
};
export const getCookiesSession = (cookieName) => Cookies.get(cookieName);

export const headersProvider = () => {
    let token = null;
    try {
    //   const data = JSON.parse(getCookiesSession('trueCounselUserData'));
    //   token = data.token;
      token = getCookiesSession('userData');
      // console.log('get cokies = ',token)
    } catch (e) {
      console.log(e);
    }
    return {
      Authorization: token,
    };
  };
