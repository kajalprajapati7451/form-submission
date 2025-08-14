  document.getElementById('current-year').textContent = new Date().getFullYear();
        
        document.getElementById('contactForm').addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            try {
                const res = await fetch('http://localhost:3000/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const result = await res.json();
                document.getElementById('status').innerText = result.message;
                
                const successMsg = document.getElementById('form-success');
                successMsg.style.display = 'block';
                successMsg.classList.add('animate__animated', 'animate__fadeIn');
                
                this.reset();
                
                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 5000);
            } catch (error) {
                document.getElementById('status').innerText = 'Error submitting form. Please try again.';
            }
        });

        const bannerSlides = document.querySelectorAll('.banner-slide');
        let currentSlide = 0;
        
        function changeSlide() {
            bannerSlides[currentSlide].classList.remove('active');
            bannerSlides[currentSlide].style.animation = 'slideOutToBottom 1.5s forwards';
            
            currentSlide = (currentSlide + 1) % bannerSlides.length;
            
            setTimeout(() => {
                bannerSlides[currentSlide].classList.add('active');
                bannerSlides[currentSlide].style.animation = 'slideInFromTop 1.5s forwards';
                
                const prevSlide = (currentSlide - 1 + bannerSlides.length) % bannerSlides.length;
                bannerSlides[prevSlide].style.animation = '';
            }, 1500);
        }
        
        bannerSlides[0].classList.add('active');
        bannerSlides[0].style.animation = 'slideInFromTop 1.5s forwards';
        
        setInterval(changeSlide, 5000);