import useClient from "../components/auth/useClient";

const useAuth = () => {
  const { account } = useClient();

  const signUp = (email, password) => {
    const promise = account.create("unique()", email, password);
    promise.then(
      function (response) {
        console.log(response);
      },
      function (error) {
        console.log(error);
      }
    );
  };

  const signIn = async (email, password) => {
    const promise = account.createEmailSession(email, password);
    promise.then(
      function (response) {
        console.log(response);
      },
      function (error) {
        console.log(error);
      }
    );
  };

  const signInWithGoogle = () => {
    account.createOAuth2Session("google");
  };

  const signOut = () => {
    const promise = account.deleteSession("current");
    promise.then(
      function (response) {
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  //link to join team (doctor / patient)
  const getRole = () => {};

  return { signUp, signIn, signInWithGoogle, signOut, getRole };
};

export default useAuth;
