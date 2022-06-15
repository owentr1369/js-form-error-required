// Validator object
function Validator(options) {
  function validate(inputElement, rule) {
    let errorElement =
      inputElement.parentElement.querySelector(".form-message");
    // Value: inputElement.value
    // test func: rule.test
    let errorMessage = rule.test(inputElement.value);
    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.parentElement.classList.add("invalid");
    } else {
      errorElement.innerText = "";
      inputElement.parentElement.classList.remove("invalid");
    }
  }

  //   Get form element which need to be validated
  let formElement = document.querySelector(options.form);
  if (formElement) {
    options.rules.forEach((rule) => {
      let inputElement = formElement.querySelector(rule.selector);

      if (inputElement) {
        // Handle on blur out of input
        inputElement.onblur = () => {
          validate(inputElement, rule);
        };
        // Handle when fill in input
        inputElement.oninput = () => {
          let errorElement =
            inputElement.parentElement.querySelector(".form-message");
          errorElement.innerText = "";
          inputElement.parentElement.classList.remove("invalid");
        };
      }
    });
  }
}

// Define Rules
// Rule of rules
// When false => return error massage
// When success => no returning (undefined)
Validator.isRequired = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : "Vui lòng nhập trường này";
    },
  };
};
Validator.isEmail = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : "Trường này phải là email";
    },
  };
};
Validator.minLength = function (selector, min) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min
        ? undefined
        : `Mật khẩu tối thiểu ${min} ký tự`;
    },
  };
};
Validator.isConfirmed = function (selector, getConfirmValue) {
  return {
    selector: selector,
    test: function (value) {
      return value === getConfirmValue()
        ? undefined
        : "Giá trị nhập vào không chính xác";
    },
  };
};
