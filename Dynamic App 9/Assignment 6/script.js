const form = document.getElementById('interactive-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const globalMessage = document.getElementById('global-success');

// Show error message and style
function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.className = 'form-group error';
    const small = formGroup.querySelector('small');
    small.innerText = message;
}

// Show success style
function showSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.className = 'form-group success';
}

// Check email format
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
        return true;
    } else {
        showError(input, 'Email is not valid');
        return false;
    }
}

// Check if passwords match
function checkPasswordsMatch(input1, input2) {
    if (input1.value === '') {
        showError(input2, 'Please enter a password first');
        return false;
    }
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
        return false;
    } else {
        showSuccess(input2);
        return true;
    }
}

// Check required fields
function checkRequired(inputArr) {
    let isValid = true;
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
            isValid = false;
        } else {
            showSuccess(input);
        }
    });
    return isValid;
}

// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
        return false;
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

// Check password complexity (optional, but good for robust validation)
function checkPasswordComplexity(input) {
    const value = input.value;
    // Require at least one number and one uppercase letter
    const regex = /^(?=.*[A-Z])(?=.*\d).+$/;

    if (value.length >= 6 && !regex.test(value)) {
        showError(input, 'Password must contain at least 1 uppercase letter and 1 number');
        return false;
    }
    return true; // If length is < 6, length check handles it.
}

// Get field name from id mapping
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1).replace('-', ' ');
}

// Event Listeners for real-time validation (on blur/input)
username.addEventListener('input', () => {
    if (username.value.trim() !== '') {
        checkLength(username, 3, 15);
    }
});

email.addEventListener('input', () => {
    if (email.value.trim() !== '') {
        checkEmail(email);
    }
});

password.addEventListener('input', () => {
    if (password.value.trim() !== '') {
        if (checkLength(password, 6, 25)) {
            checkPasswordComplexity(password);
        }
        if (confirmPassword.value.trim() !== '') {
            checkPasswordsMatch(password, confirmPassword);
        }
    }
});

confirmPassword.addEventListener('input', () => {
    if (confirmPassword.value.trim() !== '') {
        checkPasswordsMatch(password, confirmPassword);
    }
});

// Form Submit Event
form.addEventListener('submit', function (e) {
    e.preventDefault();

    globalMessage.className = 'global-message hidden'; // reset

    const requiredValid = checkRequired([username, email, password, confirmPassword]);

    // Only proceed with deeper validation if fields are not empty
    if (requiredValid) {
        const isUserValid = checkLength(username, 3, 15);
        const isEmailValid = checkEmail(email);
        const isPassLengthValid = checkLength(password, 6, 25);
        let isPassComplexValid = true;

        if (isPassLengthValid) {
            isPassComplexValid = checkPasswordComplexity(password);
        }

        const isPassMatch = checkPasswordsMatch(password, confirmPassword);

        // If everything is valid
        if (isUserValid && isEmailValid && isPassLengthValid && isPassComplexValid && isPassMatch) {
            // Show global success message
            globalMessage.className = 'global-message success-msg';
            globalMessage.textContent = 'Registration successful! Welcome aboard.';

            // Clear working store
            localStorage.clear();
            sessionStorage.clear();

            // Optional: reset form after a short delay
            setTimeout(() => {
                form.reset();
                // Remove success styles from inputs
                const successGroups = document.querySelectorAll('.form-group.success');
                successGroups.forEach(group => group.classList.remove('success'));
                globalMessage.className = 'global-message hidden';
            }, 3000);
        }
    }
});
