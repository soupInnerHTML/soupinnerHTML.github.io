const sidebar = document.querySelector('.sidebar-menu')
const toggler = document.querySelector('.header-menu')
const links = document.querySelectorAll('.sidebar-menu__link')


toggler.addEventListener('click', (e) => {
    e.preventDefault()
    
    if([...sidebar.classList].includes('active')) {
        sidebar.classList.remove('active')
    }
    else {
        sidebar.classList.add('active')
    }
    
})

links.forEach(link => {
    link.addEventListener('click', () => {
        sidebar.classList.remove('active')
    })
})

