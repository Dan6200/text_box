/* ---- This is a linked list, made to allow 
 * ---- faster insertion of lines and characters 
 * ---- during the text editing process.
 */

export class Node {
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

export class FastLists 
{
	constructor(head = null, curNode = null, tail = null)
	{
		this.#head = head;
		this.#tail = tail;
		this.#curNode = curNode;
		this.#cnt = 0;
	}

	setHead(head) {
		this.#head = head;
	}

	setTail(tail) {
		this.#tail = tail;
	}

	setCurNode(node) {
		this.#curNode = node;
	}
		
	getHead() {
		return this.#head;
	}

	getTail() {
		return this.#tail;
	}

	getCurNode() {
		return this.#curNode;
	}

	getCnt() {
		return this.#cnt;
	}

	addToHead(node) {
		if (this.getHead() == this.getTail())
		{
			this.setHead(node);
			this.setTail(node);
		}
		else {
			this.getHead().setPrev(node);
			node.setNext(this.getHead());
			this.setHead(node);
		}
		this.#cnt++;
		this.setCurNode(node);
	}

	addTail(node) {
		if (this.getHead() == this.getTail())
		{
			this.setHead(node);
			this.setTail(node);
		}
		else {
			this.getTail().setNext(node);
			node.setPrev(this.getTail());
			this.setTail(node);
		}
		this.setCurNode(node);
		this.#cnt++;
	}

	add(node) {
		if (this.getHead() == this.getTail())
		{
			this.setHead(node);
			this.setTail(node);
			this.setCurNode(node);
		}
		else {
			next = this.getCurNode().getNext();
			prev = this.getCurNode().getPrev();
			node.setNext(next);
			node.setPrev(prev);
			this.getCurNode().setNext(node);
			this.getCurNode().setPrev(node);
		}
		this.#cnt++;
	}

	forward() {
		if (this.getCurNode().getNext()) 
			this.setCurNode(this.getCurNode().getNext());
	}
	
	backward() {
		if (this.getCurNode().getPrev()) 
			this.setCurNode(this.getCurNode().getPrev());
	}

}
