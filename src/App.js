import { Button, notification } from "antd";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "./utils/firebase";
import axios from "axios";

function App() {
  const provider = new GoogleAuthProvider();

  // Add Your Endpoint Here
  const apiEndpointURL = 'http://localhost:3001/testing/firebase/auth'

  const auth = getAuth(app)

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;


        const firebaseToken = user.accessToken


        axios.post(apiEndpointURL, {
          firebaseToken
        }).then(() => notification.success({ message: "Login Successfully", duration: "3" })).catch(err => {
          console.log(err);
          notification.error({ message: "something went wrong", duration: "3" })
        })



        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  return <div className="App">
    <Button onClick={signInWithGoogle} type="primary">
      Login With google
    </Button>
    {/* <Button onClick={signInWithGoogle} type="primary">
      Login With Facebook
    </Button> */}
  </div>;
}

export default App;
