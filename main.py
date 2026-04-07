from flask import Flask, render_template, request
import re
import time

app = Flask(__name__)

# Password Strength Function
def check_strength(password):
    strength = 0

    if len(password) >= 8:
        strength += 1
    if re.search("[a-z]", password):
        strength += 1
    if re.search("[A-Z]", password):
        strength += 1
    if re.search("[0-9]", password):
        strength += 1
    if re.search("[!@#$%^&*()]", password):
        strength += 1

    if strength <= 2:
        return "Weak ❌"
    elif strength <= 4:
        return "Medium ⚠️"
    else:
        return "Strong 💪"

# Brute Force Simulation (simple)
def simulate(password):
    chars = "abcdefghijklmnopqrstuvwxyz0123456789"
    attempts = 0

    for c1 in chars:
        for c2 in chars:
            attempts += 1
            if c1 + c2 == password:
                return f"Cracked in {attempts} attempts ⚡"

    return "Not cracked (try small password)"

@app.route('/', methods=['GET', 'POST'])
@app.route('/index.html', methods=['GET', 'POST'])
def index():
    result = ""
    crack = ""

    if request.method == 'POST':
        password = request.form['password']
        result = check_strength(password)

        if request.form.get("simulate"):
            crack = simulate(password)

    return render_template('index.html', result=result, crack=crack)

if __name__ == "__main__":
    app.run(debug=True)