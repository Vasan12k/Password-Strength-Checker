// Password strength checker
function checkStrength(password) {
    let strength = 0;
    let feedback = [];

    if (password.length >= 8) {
        strength += 1;
    } else {
        feedback.push("Use at least 8 characters");
    }

    if (/[a-z]/.test(password)) {
        strength += 1;
    } else {
        feedback.push("Add lowercase letters");
    }

    if (/[A-Z]/.test(password)) {
        strength += 1;
    } else {
        feedback.push("Add uppercase letters");
    }

    if (/\d/.test(password)) {
        strength += 1;
    } else {
        feedback.push("Add numbers");
    }

    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        strength += 1;
    } else {
        feedback.push("Add special characters");
    }

    let level, color;
    if (strength <= 2) {
        level = "Weak";
        color = "#ef4444";
    } else if (strength <= 4) {
        level = "Medium";
        color = "#f59e0b";
    } else {
        level = "Strong";
        color = "#10b981";
    }

    return { level, color, feedback };
}

// Simple brute-force simulation
function simulateCrack(password) {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let attempts = 0;

    if (password.length > 4) {
        return "Simulation: Too complex for demo (would take too long)";
    }

    for (let c1 of chars) {
        for (let c2 of chars) {
            attempts++;
            if (c1 + c2 === password) {
                return `Cracked in ${attempts} attempts`;
            }
        }
    }

    return "Not cracked in simulation";
}

// Event listener
document.getElementById('passwordForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const password = document.getElementById('password').value;
    const simulate = document.getElementById('simulate').checked;

    // Strength check
    const strength = checkStrength(password);
    document.getElementById('strengthText').textContent = strength.level;
    document.getElementById('strengthBar').style.width = `${(strength.strength / 5) * 100}%`;
    document.getElementById('strengthBar').style.backgroundColor = strength.color;

    // Crack simulation
    if (simulate) {
        const crack = simulateCrack(password);
        document.getElementById('crackText').textContent = crack;
        document.getElementById('crackResult').style.display = 'block';
    } else {
        document.getElementById('crackResult').style.display = 'none';
    }

    document.getElementById('results').style.display = 'block';
});

// Matrix background effect
function createMatrixRain() {
    const canvas = document.querySelector('.matrix-bg');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "01";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = matrix[Math.floor(Math.random() * matrix.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 35);
}

createMatrixRain();