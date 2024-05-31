document.addEventListener('DOMContentLoaded', function() {
    const activityForm = document.getElementById('activity-form');
    const totalDuration = document.getElementById('total-duration');
    const averageDuration = document.getElementById('average-duration');
    const totalActivities = document.getElementById('total-activities');
    const mostCommonActivity = document.getElementById('most-common-activity');
    const chartCanvas = document.getElementById('chart');
    let durations = [];
    let activities = {};
    
    activityForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const activity = document.getElementById('activity').value;
        const duration = parseInt(document.getElementById('duration').value);
        const date = document.getElementById('date').value;
        
        durations.push(duration);
        
        if (activities[activity]) {
            activities[activity] += duration;
        } else {
            activities[activity] = duration;
        }
        
        const sum = durations.reduce((acc, curr) => acc + curr, 0);
        const avg = sum / durations.length || 0;
        
        totalDuration.textContent = sum + ' minutes';
        averageDuration.textContent = avg.toFixed(2) + ' minutes';
        totalActivities.textContent = durations.length;
        mostCommonActivity.textContent = getMostCommonActivity();
        
        updateChart();
        
        // Clear form fields
        document.getElementById('activity').value = '';
        document.getElementById('duration').value = '';
        document.getElementById('date').value = '';
    });
    
    function getMostCommonActivity() {
        let mostCommon = '-';
        let maxFrequency = 0;
        for (const activity in activities) {
            if (activities[activity] > maxFrequency) {
                maxFrequency = activities[activity];
                mostCommon = activity;
            }
        }
        return mostCommon;
    }
    
    function updateChart() {
        const activityLabels = Object.keys(activities);
        const activityDurations = activityLabels.map(label => activities[label]);
        
        const ctx = chartCanvas.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: activityLabels,
                datasets: [{
                    label: 'Activity Duration (minutes)',
                    data: activityDurations,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
});
