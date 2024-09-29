document.addEventListener('DOMContentLoaded', () => {
    const banana = document.getElementById('banana');
    const clickCountDisplay = document.getElementById('click-count');
    const levelDisplay = document.getElementById('level');
    const progress = document.getElementById('progress');
    const upgradeModal = document.getElementById('upgrade-modal');
    const upgradeButton = document.getElementById('upgrade-button');

    let clickCount = getCookie('clickCount') ? parseInt(getCookie('clickCount')) : 0;
    let level = getCookie('level') ? parseInt(getCookie('level')) : 1;
    let clicksPerBanana = getCookie('clicksPerBanana') ? parseInt(getCookie('clicksPerBanana')) : 1;

    clickCountDisplay.textContent = clickCount;
    levelDisplay.textContent = level;
    updateProgress();

    banana.addEventListener('click', () => {
        clickCount += clicksPerBanana;
        clickCountDisplay.textContent = clickCount;
        updateProgress();
        setCookie('clickCount', clickCount, 30);
        setCookie('level', level, 30);
        setCookie('clicksPerBanana', clicksPerBanana, 30);
    });

    upgradeButton.addEventListener('click', () => {
        clicksPerBanana += 1;
        clickCount = 0;
        upgradeModal.style.display = 'none';
        clickCountDisplay.textContent = clickCount;
        setCookie('clickCount', clickCount, 30);
        setCookie('clicksPerBanana', clicksPerBanana, 30);
        updateProgress();
    });

    function updateProgress() {
        const progressPercentage = (clickCount % 100) + '%';
        progress.style.width = progressPercentage;

        if (clickCount >= 100) {
            upgradeModal.style.display = 'flex';
            clickCount = 0;
            level++;
            levelDisplay.textContent = level;
        }
    }

    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
});