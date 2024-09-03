// Helper functions to manage battery level and display updates

function updateBatteryLevel(battery) {
    const batteryLevel = battery.level * 100;
    document.querySelector('.battery-level').style.width = batteryLevel + '%';
    document.querySelector('.percentage').textContent = batteryLevel.toFixed(0) + '%';
}

function updateOrientation() {
    const isResponsiveEnabled = document.getElementById('responsive-checkbox').checked;
    if (!isResponsiveEnabled) return;

    const battery = document.querySelector('.battery');
    if (window.innerWidth <= 375) {
        battery.style.width = '50px';
        battery.style.height = '200px';
        battery.style.flexDirection = 'column';
    } else {
        battery.style.width = '200px';
        battery.style.height = '50px';
        battery.style.flexDirection = 'row';
    }
}

function initBattery(battery) {
    // Initial battery level update
    updateBatteryLevel(battery);

    // Listen for changes in battery level
    battery.addEventListener('levelchange', () => updateBatteryLevel(battery));
}

function handleResize() {
    const isResponsiveEnabled = document.getElementById('responsive-checkbox').checked;
    if (isResponsiveEnabled) {
        updateOrientation();
    }
}

// Add Event Listeners
window.addEventListener('resize', handleResize);

document.getElementById('responsive-checkbox').addEventListener('change', handleResize);

// Initialize Battery API
navigator.getBattery().then((battery) => {
    initBattery(battery);
    updateOrientation(); // Set initial orientation
});
