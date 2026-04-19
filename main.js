// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('active');
}

let deferredInstallPrompt = null;

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('active');
}

function showPWAInstallBanner() {
    if (!deferredInstallPrompt || document.getElementById('pwa-install-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'pwa-install-banner';
    banner.innerHTML = `
        <div class="pwa-install-content">
            <span>Install LEEWEAR as an app for quick access.</span>
            <div class="pwa-install-actions">
                <button id="install-app-btn" class="btn-primary">Install</button>
                <button id="close-install-btn" class="pwa-install-close" aria-label="Close">×</button>
            </div>
        </div>
    `;

    document.body.appendChild(banner);

    document.getElementById('install-app-btn').addEventListener('click', async () => {
        deferredInstallPrompt.prompt();
        const choiceResult = await deferredInstallPrompt.userChoice;
        deferredInstallPrompt = null;
        if (choiceResult.outcome === 'accepted') {
            removePWAInstallBanner();
        }
    });

    document.getElementById('close-install-btn').addEventListener('click', removePWAInstallBanner);
}

function removePWAInstallBanner() {
    const banner = document.getElementById('pwa-install-banner');
    if (banner) banner.remove();
}

function initPWA() {
    window.addEventListener('beforeinstallprompt', event => {
        event.preventDefault();
        deferredInstallPrompt = event;
        showPWAInstallBanner();
    });

    window.addEventListener('appinstalled', () => {
        deferredInstallPrompt = null;
        removePWAInstallBanner();
    });

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js').catch(() => {
                // Service worker registration failed
            });
        });
    }
}

// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', function() {
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenu.classList.remove('active');
        });
    });

    initPWA();
});
