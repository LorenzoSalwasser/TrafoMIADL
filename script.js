document.addEventListener('DOMContentLoaded', function() {
    // Get all plus and minus buttons
    const plusButtons = document.querySelectorAll('.plus');
    const minusButtons = document.querySelectorAll('.minus');

    // Load saved counts from local storage
    const counts = {
        michi: localStorage.getItem('michi') || 0,
        ischant: localStorage.getItem('ischant') || 0,
        abi: localStorage.getItem('abi') || 0,
        daniel: localStorage.getItem('daniel') || 0,
        lorenzo: localStorage.getItem('lorenzo') || 0
    };

    // Initialize counts
    for (let id in counts) {
        document.getElementById(id).textContent = counts[id];
    }

    // Add event listeners to plus buttons
    plusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            let count = parseInt(targetElement.textContent);
            count++;
            targetElement.textContent = count;
            localStorage.setItem(targetId, count);
            updateRanks();
        });
    });

    // Add event listeners to minus buttons
    minusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            let count = parseInt(targetElement.textContent);
            count--;
            targetElement.textContent = count;
            localStorage.setItem(targetId, count);
            updateRanks();
        });
    });

    function updateRanks() {
        // Get all counts
        const counts = [
            { id: 'michi', count: parseInt(document.getElementById('michi').textContent) },
            { id: 'ischant', count: parseInt(document.getElementById('ischant').textContent) },
            { id: 'abi', count: parseInt(document.getElementById('abi').textContent) },
            { id: 'daniel', count: parseInt(document.getElementById('daniel').textContent) },
            { id: 'lorenzo', count: parseInt(document.getElementById('lorenzo').textContent) }
        ];

        // Sort counts in descending order
        counts.sort((a, b) => b.count - a.count);

        // Update ranks, handling ties
        let currentRank = 1;
        for (let i = 0; i < counts.length; i++) {
            if (i > 0 && counts[i].count < counts[i - 1].count) {
                currentRank = i + 1;
            }
            document.getElementById(`rank-${counts[i].id}`).textContent = currentRank;
        }
    }

    // Initial ranking update
    updateRanks();
});
