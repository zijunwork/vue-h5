/*
 * @Overview:   index
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/29 14:06
 * @Mark:       //
 */
import {IS_PROD} from "utils/validate";

let module = {
  app: {},
  route: {
    home: {
      title: "Home"
    },
    settings: {
      title: "System Settings"
    },
    request: {
      loadingText: "Loading...",
      unknownNetworkError: [
        "NetworkError",
        "NetworkTimeout",
        "UnknownException"
      ],
      errorCodeMsg: {
        e400: "RequestError",
        e401: "Unauthorized, Please login",
        e403: "AccessDenied",
        e404: "RequestAddressError",
        e408: "RequestTimedOut",
        e500: "ServerInternalError",
        e501: "ServiceNotImplemented",
        e502: "GatewayError",
        e503: "ServiceIsNotAvailable",
        e504: "GatewayTimeout",
        e505: "HTTPVersionIsNotSupported"
      }
    }
  }
};

let languageFiles = IS_PROD
  ? require.context("./modules", false, /^((?!exclude).)*\.js$/)
  : require.context("./modules", false, /\.js$/);
languageFiles.keys().forEach(name => {
  module = {...module, ...languageFiles(name).default};
});

export default module;
