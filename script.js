const name = document.querySelector('.card__name');
const cardNumber = document.querySelector('.cars__number');
const expiryDate = document.querySelector('.card__exdate');
const cvv = document.querySelector('.card__cvv');
const save = document.querySelector('.save');
const creditCards = document.querySelector('.credit__cards');
const deleteAll = document.querySelector('.delete__all');
const choose = document.querySelector('.for__switch');
const addCard = document.querySelector('.screen__button');
const addForm = document.querySelector('.add__form');
const circle = document.querySelector('.for__circle');
const cards = document.querySelector('.choose__card');
const checkAll = document.querySelectorAll('.cheking');
const masterCard = document.querySelector('#master__card');
const visaCard = document.querySelector('#visa__card');
const masterCardBlock = document.querySelector('.img__one');
const visaCardBlock = document.querySelector('.img__two');
const inputAll = document.querySelectorAll('.input__all input');

let o = false;

let q = false;

let indexElement = 0;

getCard();

addCard.addEventListener('click', () => {
	name.focus();
});

masterCardBlock.addEventListener('click', () => {
	visaCardBlock.style.border = '';
	masterCardBlock.style.borderLeft = '1px solid #f00';
	masterCardBlock.style.borderRight = '1px solid #f00';
});

visaCardBlock.addEventListener('click', () => {
	masterCardBlock.style.border = '';
	visaCardBlock.style.borderLeft = '1px solid #f00';
	visaCardBlock.style.borderRight = '1px solid #f00';
});

choose.addEventListener('click', () => {
	o = !o;
	circle.style.marginLeft = o ? '20px' : '';
	cards.style.display = o ? 'block' : '';
});

save.addEventListener('click', () => {
	saveAdd();
});

deleteAll.addEventListener('click', () => {
	localStorage.removeItem('card');
	getCard();
});

name.addEventListener('input', () => {
	name.style.borderBottom = '';
});

cardNumber.addEventListener('input', () => {
	cardNumber.style.borderBottom = '';
	let str = cardNumber.value;
	if (str.length > 19) {
		cardNumber.value = str.slice(0, 19);
	} else {
		str = str.replace(/-/g, '');
		let res = '';
		for (let i = 0; i < str.length; i++) {
			if (i !== 0 && i % 4 === 0) {
				res += '-';
			}
			res += str[i];
		}
		cardNumber.value = res;
	}
});

expiryDate.addEventListener('input', () => {
	expiryDate.style.borderBottom = '';
	let str = expiryDate.value;
	if (str.length > 7) {
		expiryDate.value = str.slice(0, 7);
	} else {
		let res = '';
		for (let i = 0; i < str.length; i++) {
			if (i === 2 && str.includes('/') !== true) {
				res += `/${str[i]}`;
			} else {
				res += str[i];
			}
		}
		expiryDate.value = res;
	}
});

cvv.addEventListener('input', () => {
	cvv.style.borderBottom = '';
	let str = cvv.value;
	if (str.length > 3) {
		cvv.value = str.slice(0, 3);
	}
});

function nums(n) {
	let m = n.split('-');
	let k = 0;
	m.forEach((el) => {
		el.replace(/\D/g, '').length === 4 ? (k += 1) : (k += 0);
	});
	if (k === 4 && n.length === 19) {
		return true;
	} else {
		cardNumber.style.borderBottom = '1px solid #f00';
		return false;
	}
}

function date(d) {
	let e = d.split('/');
	let k = 0;
	if (e.length === 2) {
		e[0].replace(/\D/g, '').length === 2 ? (k += 1) : (k += 0);
		e[1].replace(/\D/g, '').length === 4 ? (k += 1) : (k += 0);
	}
	if (k === 2 && d.length === 7) {
		return true;
	} else {
		expiryDate.style.borderBottom = '1px solid #f00';
		return false;
	}
}

function three(c) {
	let m = c.split('').join('');
	if (m.replace(/\D/g, '').length === 3) {
		return true;
	} else {
		cvv.style.borderBottom = '1px solid #f00';
		return false;
	}
}

function getCard() {
	creditCards.innerHTML = '';
	let images = ['/img/master.svg', '/img/visa.svg'];
	let getLocal = JSON.parse(localStorage.getItem('card')) || [];
	getLocal.forEach((el, idx) => {
		const card = document.createElement('div');
		card.setAttribute('class', 'card');
		card.style.background = `url(/img/one.png) no-repeat center/ cover`;
		const cardEdit = document.createElement('div');
		cardEdit.setAttribute('class', 'card__edit');
		const bankLogo = document.createElement('div');
		bankLogo.setAttribute('class', 'bank__logo');
		const bankImage = document.createElement('img');
		bankImage.src = images[el.n];
		bankLogo.append(bankImage);
		const cardIcons = document.createElement('div');
		cardIcons.setAttribute('class', 'card__icons');
		const trash = document.createElement('ion-icon');
		const create = document.createElement('ion-icon');
		trash.name = 'trash-outline';
		create.name = 'create-outline';

		trash.addEventListener('click', () => delItem(idx));

		create.addEventListener('click', () => {
			name.value = el.name;
			cardNumber.value = el.cardN;
			expiryDate.value = el.expiry;
			cvv.value = el.cvv;
			checkAll.forEach((elem, idx) => {
				if (el.n === idx) {
					elem.checked = true;
				}
			});
			q = true;
			indexElement = idx;
		});

		cardIcons.append(trash, create);
		cardEdit.append(bankLogo, cardIcons);
		const h3 = document.createElement('h3');
		h3.setAttribute('class', 'marginh3');
		h3.innerHTML = el.cardN;
		const cardInfo = document.createElement('div');
		cardInfo.setAttribute('class', 'card__info');
		const infoOne = document.createElement('div');
		infoOne.setAttribute('class', 'info__one');
		const a = document.createElement('p');
		a.innerHTML = 'Name';
		const infoOneH3 = document.createElement('h3');
		infoOneH3.innerHTML = el.name;
		infoOne.append(a, infoOneH3);
		const infoTwo = document.createElement('div');
		infoTwo.setAttribute('class', 'info__two');
		const b = document.createElement('p');
		b.innerHTML = 'Valid Till';
		const InfoTwoH3 = document.createElement('h3');
		InfoTwoH3.innerHTML = `${el.expiry.slice(0, 2)}/${el.expiry.slice(-2)}`;
		infoTwo.append(b, InfoTwoH3);
		cardInfo.append(infoOne, infoTwo);
		card.append(cardEdit, h3, cardInfo);
		creditCards.append(card);
	});
}

function delItem(n) {
	let trashForElem = JSON.parse(localStorage.getItem('card')) || [];
	trashForElem.splice(n, 1);
	localStorage.setItem('card', JSON.stringify(trashForElem));
	getCard();
}

function saveAdd() {
	let w = 0;

	if (name.value === '') {
		name.style.borderBottom = '1px solid #f00';
	} else {
		w += 1;
	}
	nums(cardNumber.value) === false ? null : (w += 1);
	date(expiryDate.value) === false ? null : (w += 1);
	three(cvv.value) === false ? null : (w += 1);

	let num = 0;

	checkAll.forEach((el, idx) => {
		if (el.checked) {
			num = idx;
		}
	});

	let object = {
		name: name.value,
		cardN: cardNumber.value,
		expiry: expiryDate.value,
		cvv: cvv.value,
		n: num,
	};

	let data = JSON.parse(localStorage.getItem('card')) || [];

	if (q !== true && w === 4) {
		checkAll.forEach((el, idx) => {
			idx === 1 ? (el.checked = true) : (el.checked = false);
		});
		masterCardBlock.style.border = '';
		visaCardBlock.style.border = '';
		data.push(object);
		localStorage.setItem('card', JSON.stringify(data));
		inputAll.forEach((el) => (el.value = ''));
		getCard();
	} else if (q === true && w === 4) {
		masterCardBlock.style.border = '';
		visaCardBlock.style.border = '';
		data.splice(indexElement, 1, object);
		localStorage.setItem('card', JSON.stringify(data));
		inputAll.forEach((el) => (el.value = ''));
		getCard();
		q = false;
		3;
	}
}
