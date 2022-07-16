/*
made with 🤪 by Joshimello
*/
if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
    window.location.replace('mobile')
}

const breakpoint = () => {
    if ($(window).width() < 992) {
        if ($(window).width() < 768) {
            return [0, 0]
        }
        return [100, 50]
    }
    return [200, 100]
}

function frameshift(frame, time) {
    console.log(breakpoint())
    $('html, body').animate({
        scrollLeft: $('[name=' + frame + ']').offset().left - breakpoint()[0],
        scrollTop: $('[name=' + frame + ']').offset().top - breakpoint()[1],
    }, time, 'easeInOutExpo')
}

$(window).on("hashchange", function() {
    frameshift(location.hash.replace('#', ''), 500)
})

window.addEventListener("resize", function() {
    frameshift(location.hash.replace('#', ''), 0)
}, false)

frameshift('0', 0)

$(window).on('load', () => {
    $('.preload').fadeOut('fast')
})

// LOAD IN
$('[name=0]').load('../html/home.html')
$('[name=2]').load('../html/about.html')
$('[name=4]').load('../html/works.html')
$('[name=6]').load('../html/links.html')
$('[name=8]').load('../html/somewhere.html')

// CLICK MENU
settings = {
    'theme': 'BRIGHT',
    'music': 'YES',
}

options = {
    'theme': ['BRIGHT', 'DARK'],
    'music': ['YES', 'NAH'],
}

if (Cookies.get('theme') == undefined) {
    for (const [key, value] of Object.entries(settings)) {
        Cookies.set(key, value)
    }
}

for (const [key, value] of Object.entries(settings)) {
    settings[key] = Cookies.get(key)
    $('.'+key).append(settings[key])

    $('.'+key).click(() => {
        $('.'+key).text((i, text) => { 
            return text === options[key][0] ? options[key][1] : options[key][0]
        })
        Cookies.set(key, $('.'+key).text())
    })
}

// SCROLL MENU
languages = ['ENG', 'CHI', 'NYA']
languages_i = 0
$('.languagetext').text(languages[languages_i])
$('.language').on('wheel', function(e){
    e.originalEvent.deltaY < 0 ? languages_i++ : languages_i--
    languages_i = Math.min(languages.length - 1, Math.max(0, languages_i))
    $('.languagetext').text(languages[languages_i])
})

$('.language').click(() => {
    // SWITCH LANGUAGE IN PROGRESS
})

locations = ['HOME', 'ABOUT', 'WORKS', 'LINKS', 'SOMEWHERE']
locations_i = 0
$('.jumptotext').text(locations[locations_i])
$('.jumpto').on('wheel', function(e){
    e.originalEvent.deltaY < 0 ? locations_i++ : locations_i--
    locations_i = Math.min(locations.length - 1, Math.max(0, locations_i))
    $('.jumptotext').text(locations[locations_i])
})

locationhash = {
    'HOME': '0',
    'ABOUT': '2',
    'WORKS': '4',
    'LINKS': '6',
    'SOMEWHERE': '8'
}

$('.jumpto').click(() => {
    location.hash = locationhash[locations[locations_i]]
})

$('body').on('click', '.setting', function() {
    $('.menu').css("display", "flex").hide().fadeIn('fast');
})

$('.modal').click(function(e){
    e.stopPropagation();
})

$('.menu').click(function(){
    $('.menu').fadeOut('fast')
})
