/* ---- This is a linked list, made to allow 
 * ---- faster insertion of lines and characters 
 * ---- during the text editing process.
 */

class Node {
	constructor(val = null, prev = null, next = null) 
	{
		this.#val = val;
		this.#prev = prev;
		this.#next = next;
	}

	setVal(value) {
		this.#val = value;
	}

	setPrev(prev) {
		this.#prev = prev;
	}

	setNext(next) {
		this.#next = next;
	}

	getVal() {
		return this.#val;
	}

	setPrev(prev) {
		return this.#prev;
	}

	setNext(next) {
		return this.#next;
	}
}

export default class FastLists 
{
	constructor(head = null, tail = null)
	{
		this.#head = head;
		this.#tail = tail;
	}

	setHead(head) {
		this.#head = head;
	}

	setTail(tail) {
		this.#tail = tail;
	}
		
	getHead() {
		return this.#head;
	}

	getTail() {
		return this.#tail;
	}

	addNode(node) {
		if (this.getHead() == this.getTail())
		{
			this.setHead(node);
			this.setTail(node);
		}
		else {
			this.getHead().setNext(node);

}
