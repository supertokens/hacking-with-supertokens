import SuperTokens from "supertokens-web-js";
import Session from "supertokens-web-js/recipe/session";
import EmailPassword from "supertokens-web-js/recipe/emailpassword";

export const superTokensInit = () => {
  SuperTokens.init({
    appInfo: {
      apiDomain: "http://localhost:3001",
      apiBasePath: "",
      appName: "Hacking With SuperTokens",
    },
    recipeList: [Session.init(), EmailPassword.init()],
  });
};
