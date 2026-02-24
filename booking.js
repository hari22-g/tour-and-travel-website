window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const jyotirlingaName = urlParams.get('name');
    const token = localStorage.getItem('token');
    const jyotirlingaImage = document.getElementById('jyotirlinga-image');
    const jyotirlingaNameElement = document.getElementById('jyotirlinga-name');
    const basePriceElement = document.getElementById('base-price');
    const numberOfPersonsInput = document.getElementById('number-of-persons');
    const totalPriceElement = document.getElementById('total-price');
    const payNowBtn = document.getElementById('pay-now-btn');
    const loginFormContainer = document.querySelector('.login-form-container');
    const formClose = document.getElementById('form-close');
    const loginBtn = document.getElementById('login-btn');
    const menuBar = document.getElementById('menu-bar');
    const navbar = document.querySelector('.navbar');

    let basePrice = 0;

    // Check if user is logged in
    if (!token) {
        loginFormContainer.classList.add('active');
        alert('⚠ Please log in to proceed with booking.');
        return;
    }

    // Fetch Jyotirlinga Data
    async function fetchJyotirlinga() {
        try {
            const response = await fetch(http://localhost:5000/api/jyotirlingas/${jyotirlingaName}, {
                headers: { 'Authorization': Bearer ${token} },
            });
            if (!response.ok) {
                throw new Error('Jyotirlinga not found');
            }
            const jyotirlinga = await response.json();
            jyotirlingaImage.src = jyotirlinga.image;
            jyotirlingaNameElement.textContent = jyotirlinga.name;
            basePrice = parseFloat(jyotirlinga.price.match(/₹(\d+)/)[1]);
            basePriceElement.textContent = ₹${basePrice};
            updateTotalPrice();
        } catch (error) {
            console.error('❌ Error fetching jyotirlinga:', error);
            alert('⚠ Unable to load Jyotirlinga data.');
            jyotirlingaNameElement.textContent = 'Error loading data';
        }
    }

    // Update Total Price
    function updateTotalPrice() {
        const numberOfPersons = parseInt(numberOfPersonsInput.value) || 1;
        const totalPrice = basePrice * numberOfPersons;
        totalPriceElement.textContent = ₹${totalPrice};
    }

    // Handle Pay Now Button
    payNowBtn.addEventListener('click', async () => {
        const numberOfPersons = parseInt(numberOfPersonsInput.value);
        if (!numberOfPersons || numberOfPersons < 1) {
            alert('⚠ Please enter a valid number of persons.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/bookings/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Bearer ${token},
                },
                body: JSON.stringify({ jyotirlingaName, numberOfPersons }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error);
            }

            const options = {
                key: data.key,
                amount: data.amount,
                currency: data.currency,
                name: 'Travel Website',
                description: Booking for ${jyotirlingaName},
                order_id: data.orderId,
                handler: async function (response) {
                    try {
                        const verifyResponse = await fetch('http://localhost:5000/api/bookings/verify-payment', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': Bearer ${token},
                            },
                            body: JSON.stringify({
                                orderId: response.razorpay_order_id,
                                paymentId: response.razorpay_payment_id,
                                signature: response.razorpay_signature,
                            }),
                        });
                        const verifyData = await verifyResponse.json();
                        if (verifyResponse.ok) {
                            alert('✅ Payment successful! Booking confirmed.');
                            window.location.href = 'index.html';
                        } else {
                            alert(⚠ ${verifyData.error});
                        }
                    } catch (error) {
                        console.error('❌ Payment verification error:', error);
                        alert('⚠ Payment verification failed.');
                    }
                },
                prefill: {
                    email: localStorage.getItem('email') || '',
                },
                theme: {
                    color: '#ff4d4d',
                },
            };

            const rzp = new Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('❌ Create order error:', error);
            alert(⚠ ${error.message});
        }
    });

    // Update Total Price on Input Change
    numberOfPersonsInput.addEventListener('input', updateTotalPrice);

    // Login Form Toggle
    loginBtn.addEventListener('click', () => {
        loginFormContainer.classList.toggle('active');
    });

    // Close Form
    formClose.addEventListener('click', () => {
        loginFormContainer.classList.remove('active');
        if (!token) {
            window.location.href = 'index.html';
        }
    });

    // Handle Login Form Submission
    document.querySelector('.login-form-container form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.querySelector('.login-form-container input[type="email"]').value;
        const password = document.querySelector('.login-form-container input[type="password"]').value;

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('email', email);
                loginFormContainer.classList.remove('active');
                alert('✅ Login successful!');
                fetchJyotirlinga();
            } else {
                alert(⚠ ${data.error});
            }
        } catch (error) {
            console.error('❌ Login error:', error);
            alert('⚠ Server error. Please try again.');
        }
    });

    // Menu Toggle for Mobile
    menuBar.addEventListener('click', () => {
        menuBar.classList.toggle('fa-times');
        navbar.classList.toggle('active');
    });

    // Initialize
    fetchJyotirlinga();
};