
const html_translations = {
	mainNav: {
		opt1: '',
		opt2: '',
		opt3: ''
	}
}


const es =  Object.create(html_translations)
const en = Object.create(html_translations)
const eus = Object.create(html_translations)


es.mainNav = {
	opt1: '¿Quienes somos?',
	opt2: 'Servicios',
	opt3: 'Ofertas',

}

en.mainNav = {
	opt1: '¿Who are we?',
	opt2: 'Services',
	opt3: 'Offers',
}

eus.mainNav = {
	opt1: 'Nor gara?',
	opt2: 'Serbitzuak',
	opt3: 'Ofertak'
}


module.exports = {
	languages: {en, es, eus}

}
