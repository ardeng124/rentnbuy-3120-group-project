//Authorisation Profile used by all Axios Requests to talk to the backend and database
export const AuthProfile = () => {
    return {
      headers: {
        Authorization: 'Basic ' + localStorage.getItem('token')
      }
  };
  }
  
  export default AuthProfile