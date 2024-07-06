import {
  doesEmailExist,
  signIn,
  signUp,
} from "supertokens-web-js/recipe/emailpassword";
import { createSignal } from "solid-js";
import "./App.css";
import { superTokensInit } from "./config/supertokens";
import { useNavigate } from "@solidjs/router";

async function signUpClicked(
  email: string,
  password: string,
  navigate: (path: string) => void
) {
  try {
    let response = await signUp({
      formFields: [
        {
          id: "email",
          value: email,
        },
        {
          id: "password",
          value: password,
        },
      ],
    });

    console.log(email, password);

    if (response.status === "FIELD_ERROR") {
      // one of the input formFields failed validaiton
      response.formFields.forEach((formField) => {
        if (formField.id === "email") {
          // Email validation failed (for example incorrect email syntax),
          // or the email is not unique.
          window.alert(formField.error);
        } else if (formField.id === "password") {
          // Password validation failed.
          // Maybe it didn't match the password strength
          window.alert(formField.error);
        }
      });
    } else if (response.status === "SIGN_UP_NOT_ALLOWED") {
      // the reason string is a user friendly message
      // about what went wrong. It can also contain a support code which users
      // can tell you so you know why their sign up was not allowed.
      window.alert(response.reason);
    } else {
      // sign up successful. The session tokens are automatically handled by
      // the frontend SDK.
      navigate("/dashboard/");
    }
  } catch (err: any) {
    console.log(err);

    if (err.isSuperTokensGeneralError === true) {
      // this may be a custom error message sent from the API by you.
      window.alert(err.message);
    } else {
      window.alert("Oops! Something went wrong.");
    }
  }
}

async function checkEmail(email: string) {
  try {
    let response = await doesEmailExist({
      email,
    });

    return response;
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      // this may be a custom error message sent from the API by you.
      window.alert(err.message);
    } else {
      window.alert("Oops! Something went wrong.");
    }
  }
}

async function signInClicked(
  email: string,
  password: string,
  navigate: (path: string) => void
) {
  try {
    let response = await signIn({
      formFields: [
        {
          id: "email",
          value: email,
        },
        {
          id: "password",
          value: password,
        },
      ],
    });

    if (response.status === "FIELD_ERROR") {
      response.formFields.forEach((formField) => {
        if (formField.id === "email") {
          // Email validation failed (for example incorrect email syntax).
          window.alert(formField.error);
        }
      });
    } else if (response.status === "WRONG_CREDENTIALS_ERROR") {
      window.alert("Email password combination is incorrect.");
    } else if (response.status === "SIGN_IN_NOT_ALLOWED") {
      // the reason string is a user friendly message
      // about what went wrong. It can also contain a support code which users
      // can tell you so you know why their sign in was not allowed.
      window.alert(response.reason);
    } else {
      // sign in successful. The session tokens are automatically handled by
      // the frontend SDK.
      navigate("/dashboard/");
    }
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      // this may be a custom error message sent from the API by you.
      window.alert(err.message);
    } else {
      window.alert("Oops! Something went wrong.");
    }
  }
}

function Auth() {
  const navigate = useNavigate();
  superTokensInit();

  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

  const handleSignUpClicked = async () => {
    const res = await checkEmail(email());
    if (!res?.doesExist) {
      signUpClicked(email(), password(), navigate);
    } else {
      window.alert("Email already exists. Please sign in instead");
    }
  };

  const handleSignInClicked = async () => {
    const res = await checkEmail(email());
    if (res?.doesExist) {
      signInClicked(email(), password(), navigate);
    } else {
      window.alert("Email does not exist. Please sign up instead");
    }
  };

  return (
    <div class="wrapper">
      <div class="form-wrap">
        <input
          type="email"
          placeholder="Email"
          onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
        />
        <input
          type="password"
          placeholder="Password"
          onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
        />
        <button onClick={handleSignUpClicked}>Sign Up</button>
        <button onClick={handleSignInClicked}>Sign In</button>
      </div>
    </div>
  );
}

export default Auth;
