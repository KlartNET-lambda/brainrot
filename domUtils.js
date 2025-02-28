class DOMQueryError extends Error {
	/** @param {string} message */
	constructor(message) {
		super(message);
		this.name = "DOMQueryError";
	}
}

class DOMTypeError extends Error {
	/** @param {string} message */
	constructor(message) {
		super(message);
		this.name = "DOMTypeError";
	}
}



/**
 * @template {HTMLElement} T
 * @param {string} selector
 * @param {{ new (...args: any[]) => T }} instance
 * @returns {T}
 */
export function querySelector_s(selector, instance) {
	const element = document.querySelector(selector);
	
	if (element === null) {
		throw new DOMQueryError(`Cannot find element by selector: "${selector}"`);
	} else if (!(element instanceof instance)) {
		throw new DOMTypeError(`"${selector}": Expected <${instance.name}>, but <${element.constructor.name}>`);
	}

	return element;
}