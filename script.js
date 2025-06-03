document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('voucherForm');
    const successMessage = document.getElementById('successMessage');
    
    // Web App URL (replace with your actual Google Apps Script Web App URL)
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbzmAnSq1RdHllFpNDIA9WF3UK6aMvjIT79eDvOTz9jZZZIobSxXZLpvX_yfnLkez98Hbg/exec';
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const voucher = document.getElementById('voucher').value;
        const timestamp = new Date().toISOString();
        
        // Create form data
        const formData = new FormData();
        formData.append('timestamp', timestamp);
        formData.append('name', name);
        formData.append('voucher', voucher);
        
        // Submit to Google Sheets via Apps Script Web App
        fetch(scriptUrl, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            // Show success message
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Reset form
            form.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
                form.style.display = 'block';
            }, 5000);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting your voucher. Please try again.');
        });
    });
    
    // Add floating animation to card on hover
    const card = document.querySelector('.card');
    card.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
    
    // Reset card position when mouse leaves
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
});