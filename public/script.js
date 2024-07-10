document.addEventListener('DOMContentLoaded', () => {
    const loginMethodRadios = document.querySelectorAll('input[name="loginMethod"]');
    const qrSection = document.getElementById('qrSection');
    const codeSection = document.getElementById('codeSection');
    const responseContainer = document.getElementById('responseContainer');
    const qrContainer = document.getElementById('qrContainer');
    const authOptions = document.querySelectorAll('.auth-option');

    loginMethodRadios.forEach(radio => {
        radio.addEventListener('change', toggleLoginMethod);
    });

    document.getElementById('authForm').addEventListener('submit', handleFormSubmit);

    authOptions.forEach(option => {
        option.addEventListener('click', () => {
            authOptions.forEach(o => o.classList.remove('active'));
            option.classList.add('active');
        });
    });

    function toggleLoginMethod() {
        const selectedMethod = document.querySelector('input[name="loginMethod"]:checked').value;
        if (selectedMethod === 'qr') {
            qrSection.classList.remove('hidden');
            codeSection.classList.add('hidden');
        } else {
            qrSection.classList.add('hidden');
            codeSection.classList.remove('hidden');
        }
    }

    async function handleFormSubmit(event) {
        event.preventDefault();

        const sessionInput = document.getElementById('session');
        const phoneNumberInput = document.getElementById('phoneNumber');
        const loginMethod = document.querySelector('input[name="loginMethod"]:checked').value;
        responseContainer.classList.add('hidden');
        qrContainer.classList.add('hidden');

        if (loginMethod === 'qr') {
            const session = sessionInput.value.trim();
            if (!session) {
                return showResponse('Please enter your session password.');
            }
            try {
                await fetchQRCode(session);
            } catch (error) {
                showResponse(error.message);
            }
        } else if (loginMethod === 'code') {
            const phoneNumber = phoneNumberInput.value.trim();
            if (!phoneNumber) {
                return showResponse('Please enter your phone number.');
            }
            try {
                await fetchCode(phoneNumber);
            } catch (error) {
                showResponse(error.message);
            }
        }
    }

    async function fetchQRCode(session) {
        const response = await fetch(`/wa/qr?session=${encodeURIComponent(session)}`);
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.error || 'Error fetching QR Code');
        }
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        qrContainer.style.display = 'block';
        qrContainer.classList.remove('hidden');
        qrContainer.innerHTML = `<img src="${imageUrl}" alt="QR Code"/>`;
    }

    async function fetchCode(phoneNumber) {
        const response = await fetch(`/wa/code?phoneNumber=${encodeURIComponent(phoneNumber)}`);
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.error || 'Failed to get code');
        }
        showResponse(`Your Pairing Code: ${result.code}`, true);
    }

    function showResponse(message, success = false) {
        responseContainer.textContent = '';
        responseContainer.style.color = success ? '#0f0' : '#f00';
        responseContainer.classList.remove('hidden');
        typeWriterEffect(message, responseContainer);
    }

    function typeWriterEffect(text, container) {
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                container.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        typeWriter();
    }
});
