let watchedAds = parseInt(localStorage.getItem("watchedAds") || 0);
let earnedPoints = parseFloat(localStorage.getItem("earnedPoints") || 0.00);

function updateProgressBar() {
    const progress = (watchedAds % 20) * 5;
    document.getElementById('progress-circle').style.background = `conic-gradient(#4caf50 ${progress}%, #444 ${progress}%)`;
    document.getElementById('progress-circle').textContent = `${progress}%`;
}

function toggleWithdraw() {
    document.getElementById('withdraw-section').classList.toggle('hidden');
}

function withdrawPoints() {
    const amount = parseFloat(document.getElementById('withdraw-amount').value);
    const method = document.getElementById('payment-method').value;
    const phone = document.getElementById('phone-number').value;

    if (amount < 0.30 || amount > earnedPoints) {
        alert('Invalid withdrawal amount.');
        return;
    }

    earnedPoints -= amount;
    localStorage.setItem('earnedPoints', earnedPoints.toFixed(2));
    document.getElementById('earned-points').textContent = earnedPoints.toFixed(2);

    // Telegram Bot API ছাড়া মেসেজ কনসোল-এ দেখানো হবে
    console.log(`📢 Withdrawal Request:\n💰 Amount: ${amount} BDT\n🏦 Method: ${method}\n📞 Phone: ${phone}`);
}

document.getElementById('watch-ad-btn').addEventListener('click', watchAd);
document.getElementById('withdraw-btn').addEventListener('click', toggleWithdraw);
document.getElementById('submit-withdraw').addEventListener('click', withdrawPoints);
document.getElementById('join-btn').addEventListener('click', function () {
    window.location.href = "https://t.me/freeincomeee2025";
});

function watchAd() {
    if (typeof show_2833997 === 'function') {
        show_2833997().then(() => {
            watchedAds++;
            earnedPoints += 0.1;
            localStorage.setItem('watchedAds', watchedAds);
            localStorage.setItem('earnedPoints', earnedPoints.toFixed(2));
            document.getElementById('watched-ads').textContent = watchedAds;
            document.getElementById('earned-points').textContent = earnedPoints.toFixed(2);
            updateProgressBar();
        }).catch(err => console.error("Ad failed to load", err));
    } else {
        console.warn("Ad function is not available.");
    }
}
