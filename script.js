const name = document.querySelector('.card__name');
const cardNumber = document.querySelector('.cars__number');
const expiryDate = document.querySelector('.card__exdate');
const cvv = document.querySelector('.card__cvv');
const save = document.querySelector('.save');
const creditCards = document.querySelector('.credit__cards');
const deleteAll = document.querySelector('.delete__all');

let q = false;

deleteAll.addEventListener('click', () => {
	localStorage.removeItem('card');
	getCard();
});

console.log(q);

getCard();

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
			if (i === 2) {
				res += '/';
			} else [(res += str[i])];
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

save.addEventListener('click', () => {
	function nums(n) {
		let m = n.split('-');
		let k = 0;
		m.forEach((el) => {
			el.replace(/\D/g, '').length === 4 ? (k += 1) : (k += 0);
		});
		return k === 4 ? true : false;
	}

	function date(d) {
		let e = d.split('/');
		let k = 0;
		if (e.length === 2) {
			e[0].replace(/\D/g, '').length === 2 ? (k += 1) : (k += 0);
			e[1].replace(/\D/g, '').length === 4 ? (k += 1) : (k += 0);
		}
		return k === 2 ? true : false;
	}

	function three(c) {
		let m = c.split('').join('');
		return m.replace(/\D/g, '').length === 3 ? true : false;
	}

	let w = 0;

	name.value === '' ? (name.style.borderBottom = '1px solid #f00') : (w += 1);
	nums(cardNumber.value) === true ? (w += 1) : (cardNumber.style.borderBottom = '1px solid #f00');
	date(expiryDate.value) === false ? (expiryDate.style.borderBottom = '1px solid #f00') : (w += 1);
	three(cvv.value) === false ? (cvv.style.borderBottom = '1px solid #f00') : (w += 1);

	console.log(w);
	if (w === 4) {
		if (q !== true) {
			let object = {
				name: name.value,
				cardN: cardNumber.value,
				expiry: expiryDate.value,
				cvv: cvv.value,
			};

			let data = JSON.parse(localStorage.getItem('card')) || [];
			data.push(object);
			localStorage.setItem('card', JSON.stringify(data));
			getCard();
		}
	}
	w = 0;
});

function getCard() {
	creditCards.innerHTML = '';
	let getLocal = JSON.parse(localStorage.getItem('card')) || [];
	getLocal.forEach((el, idx) => {
		const card = document.createElement('div');
		card.setAttribute('class', 'card');
		const cardEdit = document.createElement('div');
		cardEdit.setAttribute('class', 'card__edit');
		const bankLogo = document.createElement('div');
		bankLogo.setAttribute('class', 'bank__logo');
		// const mastercard = document.createElement('svg');
		// mastercard.style.width = '50px';
		// mastercard.style.height = '50px';
		const bankImage = document.createElement('img');
		bankImage.src = '/img/Logo.svg';
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
			q = true;
			save.addEventListener('click', () => {
				let getRemove = JSON.parse(localStorage.getItem('card')) || [];
				let obj = {
					name: name.value,
					cardN: cardNumber.value,
					expiry: expiryDate.value,
					cvv: cvv.value,
				};
				getRemove.splice(idx, 1, obj);
				localStorage.setItem('card', JSON.stringify(getRemove));
				getCard();
				q = false;
			});
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
