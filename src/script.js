// Lines 1-15: Application initialization and constants
class ChmodCalculator {
    constructor() {
        this.permissions = {
            owner: { read: false, write: false, execute: false },
            group: { read: false, write: false, execute: false },
            others: { read: false, write: false, execute: false }
        };
        
        this.init();
    }

    // Lines 16-25: Initialize event listeners
    init() {
        this.bindEvents();
        this.updateResults();
        console.log('Chmod Calculator initialized successfully');
    }

    // Lines 26-45: Bind all event listeners
    bindEvents() {
        // Checkbox change events
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => this.handleCheckboxChange(e));
        });

        // Octal input conversion
        const octalInput = document.getElementById('octal-input');
        const convertBtn = document.getElementById('convert-btn');
        
        convertBtn.addEventListener('click', () => this.convertFromOctal());
        octalInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.convertFromOctal();
        });

        // Preset buttons
        const presetButtons = document.querySelectorAll('.preset-btn');
        presetButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.applyPreset(e.target.dataset.value));
        });
    }

    // Lines 46-55: Handle checkbox state changes
    handleCheckboxChange(event) {
        const checkbox = event.target;
        const user = checkbox.dataset.user;
        const permission = checkbox.dataset.permission;
        
        this.permissions[user][permission] = checkbox.checked;
        this.updateResults();
        
        // Visual feedback
        this.animateChange(checkbox.closest('.permission-section'));
    }

    // Lines 56-70: Calculate octal notation from permissions
    calculateOctal() {
        const calculateUserOctal = (userPermissions) => {
            let value = 0;
            if (userPermissions.read) value += 4;
            if (userPermissions.write) value += 2;
            if (userPermissions.execute) value += 1;
            return value;
        };

        const owner = calculateUserOctal(this.permissions.owner);
        const group = calculateUserOctal(this.permissions.group);
        const others = calculateUserOctal(this.permissions.others);

        return `${owner}${group}${others}`;
    }

    // Lines 71-85: Generate symbolic notation (ls -l format)
    calculateSymbolic() {
        const generateUserSymbol = (userPermissions) => {
            let symbol = '';
            symbol += userPermissions.read ? 'r' : '-';
            symbol += userPermissions.write ? 'w' : '-';
            symbol += userPermissions.execute ? 'x' : '-';
            return symbol;
        };

        const owner = generateUserSymbol(this.permissions.owner);
        const group = generateUserSymbol(this.permissions.group);
        const others = generateUserSymbol(this.permissions.others);

        return `-${owner}${group}${others}`;
    }

    // Lines 86-95: Update all result displays
    updateResults() {
        const octal = this.calculateOctal();
        const symbolic = this.calculateSymbolic();
        const command = `chmod ${octal} <filename>`;

        document.getElementById('octal-result').textContent = octal;
        document.getElementById('symbolic-result').textContent = symbolic;
        document.getElementById('command-result').textContent = command;
    }

    // Lines 96-120: Convert from octal input to checkboxes
    convertFromOctal() {
        const input = document.getElementById('octal-input');
        const octalValue = input.value.trim();
        
        // Validate input
        if (!/^[0-7]{3}$/.test(octalValue)) {
            this.showError('Please enter a valid 3-digit octal value (000-777)');
            return;
        }

        // Clear existing permissions
        this.clearAllPermissions();

        // Convert each digit to permissions
        const digits = octalValue.split('').map(Number);
        const users = ['owner', 'group', 'others'];

        digits.forEach((digit, index) => {
            const user = users[index];
            this.setPermissionsFromDigit(user, digit);
        });

        this.updateCheckboxes();
        this.updateResults();
        input.value = '';
    }

    // Lines 121-135: Set permissions based on octal digit
    setPermissionsFromDigit(user, digit) {
        this.permissions[user].read = (digit & 4) !== 0;
        this.permissions[user].write = (digit & 2) !== 0;
        this.permissions[user].execute = (digit & 1) !== 0;
    }

    // Lines 136-145: Apply preset permission values
    applyPreset(octalValue) {
        document.getElementById('octal-input').value = octalValue;
        this.convertFromOctal();
        this.animatePresetApplication();
    }

    // Lines 146-155: Clear all permissions
    clearAllPermissions() {
        Object.keys(this.permissions).forEach(user => {
            this.permissions[user] = { read: false, write: false, execute: false };
        });
    }

    // Lines 156-170: Update checkbox states to match permissions
    updateCheckboxes() {
        Object.keys(this.permissions).forEach(user => {
            Object.keys(this.permissions[user]).forEach(permission => {
                const checkbox = document.querySelector(
                    `input[data-user="${user}"][data-permission="${permission}"]`
                );
                if (checkbox) {
                    checkbox.checked = this.permissions[user][permission];
                }
            });
        });
    }

    // Lines 171-185: Visual feedback animations
    animateChange(element) {
        element.style.transform = 'scale(1.05)';
        element.style.transition = 'transform 0.2s ease';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }

    animatePresetApplication() {
        const resultCards = document.querySelectorAll('.result-card');
        resultCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'pulse 0.6s ease-in-out';
            }, index * 100);
        });
    }

    // Lines 186-195: Error handling
    showError(message) {
        const input = document.getElementById('octal-input');
        input.style.borderColor = '#e74c3c';
        input.placeholder = message;
        
        setTimeout(() => {
            input.style.borderColor = '#ddd';
            input.placeholder = 'e.g., 755';
        }, 3000);
    }
}

// Lines 196-205: CSS animations (to be added to CSS file)
const additionalCSS = `
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}
`;

// Lines 206-210: Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChmodCalculator();
    console.log('Chmod Calculator ready!');

});
