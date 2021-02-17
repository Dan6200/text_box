/* ---- This is a linked list, made to allow 
 * ---- faster insertion of lines and characters 
 * ---- during the text editing process.
 */

export class Node {
	constructor(val = null, prev = null, next = null) 
	{
		this._val = val;
		this._prev = prev;
		this._next = next;
	}

	setVal(value) {
		this._val = value;
	}

	setPrev(prev) {
		this._prev = prev;
	}

	setNext(next) {
		this._next = next;
	}

	getVal() {
		return this._val;
	}

	getPrev(prev) {
		return this._prev;
	}

	getNext(next) {
		return this._next;
	}
}

export class FastLists 
{
	constructor(val = null)
	{
		this._head = new Node(val);
		this._tail = this._head;
		this._curNode = this._head;
		this._cnt = (val)? 1 : 0;
	}

	setHead(head) {
		this._head = head;
	}

	setTail(tail) {
		this._tail = tail;
	}

	setCurNode(node) {
		this._curNode = node;
	}
		
	getHead() {
		return this._head;
	}

	getTail() {
		return this._tail;
	}

	getCurNode() {
		return this._curNode;
	}

	getCnt() {
		return this._cnt;
	}

	addHead(val) {
		if (this.getHead() === null)
		{
			let node = new Node(val);
			this.setHead(node);
			this.setTail(node);
			this.setCurNode(node);
		}
		else {
			let node = new Node(val);
			this.getHead().setPrev(node);
			node.setNext(this.getHead());
			this.setHead(node);
			this.setCurNode(node);
		}
		this._cnt++;
	}

	addTail(val) {
		if (this.getHead() === null)
		{
			let node = new Node(val);
			this.setHead(node);
			this.setTail(node);
			this.setCurNode(node);
		}
		else {
			let node = new Node(val);
			this.getTail().setNext(node);
			node.setPrev(this.getTail());
			this.setTail(node);
			this.setCurNode(node);
		}
		this._cnt++;
	}

	add(val) {
		if (this.getHead() === null)
			this.addHead(val);
		else if (this.getCurNode().getNext() === null)
			this.addTail(val);
		else {
			let node = new Node(val);
			let next = this.getCurNode().getNext();
			let curr = this.getCurNode();
			node.setNext(next);
			node.setPrev(curr);
			next.setPrev(node);
			this.getCurNode().setNext(node);
			this.setCurNode(node);
			this._cnt++;
		}
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
