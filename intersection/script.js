const target = document.getElementById('observable');
const banner = document.getElementById('top');

const options = {
    root: null,
    rootMargin: '0px',
    threshold: [0],
};

const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            banner.className = 'yes';
            banner.innerHTML = "Visible";
        } else {
            banner.className = 'no';
            banner.innerHTML = "Not Visible";
        }
    }, 
    options);

observer.observe(target);