export const validPasswordTest = (value) => {
    const emailRegex = /^(?=.[a-zA-Z])(?=.\d)(?=.*[\W_]).{8,}$/;
    //   /^(?=.[A-Za-z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValidPws = emailRegex.test(value);
    return isValidPws;
  };
  
  export const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  
  export const validateName = (value) => {
    const regex = /^[A-Za-z]*$/;
    return regex.test(value);
  };
  
  export const validateNumber = (value) => {
    const regex = /^[0-9]*$/;
    return regex.test(value);
  };