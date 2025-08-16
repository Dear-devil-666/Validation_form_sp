document.addEventListener('DOMContentLoaded', function() {
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const loginFormContent = document.getElementById('loginFormContent');
    const signupFormContent = document.getElementById('signupFormContent');
    const formContainer = document.getElementById('form-container');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const successModal = document.getElementById('successModal');
    const modalContent = successModal.querySelector('div');
    const modalMessage = document.getElementById('modalMessage');

    // Login Form fields
    const loginUsernameInput = document.getElementById('loginUsername');
    const loginPasswordInput = document.getElementById('loginPassword');
    const loginUsernameError = document.getElementById('loginUsernameError');
    const loginPasswordError = document.getElementById('loginPasswordError');
    
    // Signup Form fields
    const signupUsernameInput = document.getElementById('signupUsername');
    const signupEmailInput = document.getElementById('signupEmail');
    const signupPasswordInput = document.getElementById('signupPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('termsCheckbox');
    const signupUsernameError = document.getElementById('signupUsernameError');
    const signupEmailError = document.getElementById('signupEmailError');
    const signupPasswordError = document.getElementById('signupPasswordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const termsError = document.getElementById('termsError');

    // Add tab click listeners
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        loginFormContent.classList.add('active');
        signupFormContent.classList.remove('active');
        clearAllErrors();
    });

    signupTab.addEventListener('click', () => {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        loginFormContent.classList.remove('active');
        signupFormContent.classList.add('active');
        clearAllErrors();
    });
    
    // Add input event listeners to clear errors on keypress for login form
    loginUsernameInput.addEventListener('input', () => clearError(loginUsernameError));
    loginPasswordInput.addEventListener('input', () => clearError(loginPasswordError));

    // Add input event listeners to clear errors on keypress for signup form
    signupUsernameInput.addEventListener('input', () => clearError(signupUsernameError));
    signupEmailInput.addEventListener('input', () => clearError(signupEmailError));
    signupPasswordInput.addEventListener('input', () => clearError(signupPasswordError));
    confirmPasswordInput.addEventListener('input', () => clearError(confirmPasswordError));
    termsCheckbox.addEventListener('change', () => clearError(termsError));

    // Form submission handlers
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateLoginForm()) {
            showModal('Login successful.');
            loginForm.reset();
        }
    });

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateSignupForm()) {
            showModal('Account created successfully!');
            signupForm.reset();
        }
    });

    function validateLoginForm() {
        let isValid = true;
        clearAllErrors();

        if (loginUsernameInput.value.trim() === '') {
            displayError(loginUsernameError, 'Username is required.');
            isValid = false;
        } else if (loginUsernameInput.value.trim().length < 3) {
            displayError(loginUsernameError, 'Username must be at least 3 characters.');
            isValid = false;
        }
        
        if (loginPasswordInput.value.trim() === '') {
            displayError(loginPasswordError, 'Password is required.');
            isValid = false;
        }

        return isValid;
    }

    function validateSignupForm() {
        let isValid = true;
        clearAllErrors();

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;
        
        if (signupUsernameInput.value.trim() === '') {
            displayError(signupUsernameError, 'Username is required.');
            isValid = false;
        } else if (signupUsernameInput.value.trim().length < 3) {
            displayError(signupUsernameError, 'Username must be at least 3 characters.');
            isValid = false;
        }
        
        if (signupEmailInput.value.trim() === '') {
            displayError(signupEmailError, 'Email is required.');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmailInput.value.trim())) {
            displayError(signupEmailError, 'Please enter a valid email address.');
            isValid = false;
        }
        
        if (signupPasswordInput.value.trim() === '') {
            displayError(signupPasswordError, 'Password is required.');
            isValid = false;
        } else if (!passwordPattern.test(signupPasswordInput.value.trim())) {
            displayError(signupPasswordError, 'Password must be at least 8 characters and include a capital, small, number, and special character.');
            isValid = false;
        }

        if (confirmPasswordInput.value.trim() === '') {
            displayError(confirmPasswordError, 'Please confirm your password.');
            isValid = false;
        } else if (confirmPasswordInput.value.trim() !== signupPasswordInput.value.trim()) {
            displayError(confirmPasswordError, 'Passwords do not match.');
            isValid = false;
        }

        if (!termsCheckbox.checked) {
            displayError(termsError, 'You must agree to the Terms & Conditions.');
            isValid = false;
        }

        return isValid;
    }

    function displayError(element, message) {
        element.textContent = message;
        element.classList.add('show');
    }

    function clearError(element) {
        element.textContent = '';
        element.classList.remove('show');
    }

    function clearAllErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => clearError(el));
    }

    function showModal(message) {
        modalMessage.textContent = message;
        successModal.classList.remove('hidden');
        setTimeout(() => {
            successModal.classList.add('opacity-100');
            modalContent.classList.add('scale-100');
        }, 10);
    }

    window.closeModal = function() {
        successModal.classList.remove('opacity-100');
        modalContent.classList.remove('scale-100');
        setTimeout(() => {
            successModal.classList.add('hidden');
        }, 300);
    };
});
