import React from "react";
import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import App from './App';
import modifier from './Reducer.js';

test('adds letter to keyboard state', () => {
	expect(modifier(
	{
		line: [[]], 
		lIdx: 0,
		wIdx: 0,
	},
		{type: 'A'}
	).line[0][0]).toBe('A')
})

test('Left Scrolling', () => {
	expect((() => {
		const {lIdx, wIdx} = modifier({line: [['A', 'B']], 
			lIdx: 0, wIdx: 1,}, {type: "ArrowLeft"})
		return {lIdx, wIdx}
	})()).toEqual({lIdx: 0, wIdx: 0})

	expect((() => {
		const {lIdx, wIdx} = modifier({line: [['A', 'B']], 
			lIdx: 0, wIdx: -1,}, {type: "ArrowLeft"})
		return {lIdx, wIdx}
	})()).toEqual({lIdx: 0, wIdx: 0})

	expect((() => {
		const {lIdx, wIdx} = modifier({line: [['A', 'B'], ['C']], 
			lIdx: 1, wIdx: 0,}, {type: "ArrowLeft"})
		return {lIdx, wIdx}
	})()).toEqual({lIdx: 0, wIdx: 2})
})

test('Right Scrolling', () => {
	expect((() => {
		const {lIdx, wIdx} = modifier({line: [['A', 'B']], 
			lIdx: 0, wIdx: 1,}, {type: "ArrowRight"})
		return {lIdx, wIdx}
	})()).toEqual({lIdx: 0, wIdx: 2})

	expect((() => {
		const {lIdx, wIdx} = modifier({line: [['A', 'B'], ['C']], 
			lIdx: 0, wIdx: 2,}, {type: "ArrowRight"})
		return {lIdx, wIdx}
	})()).toEqual({lIdx: 1, wIdx: 0})

	expect((() => {
		const {lIdx, wIdx} = modifier({line: [['A', 'B'], ['C']], 
			lIdx: 1, wIdx: 1,}, {type: "ArrowRight"})
		return {lIdx, wIdx}
	})()).toEqual({lIdx: 1, wIdx: 1})
})

test('Up Scrolling', () => {
	expect((() => {
		const {lIdx, wIdx} = modifier({line: [['A', 'B']], 
			lIdx: 0, wIdx: 1,}, {type: "ArrowUp"})
		return {lIdx, wIdx}
	})()).toEqual({lIdx: 0, wIdx: 1})

	expect((() => {
		const {lIdx, wIdx} = modifier({line: [['A', 'B'], ['C']], 
			lIdx: 0, wIdx: 2,}, {type: "ArrowUp"})
		return {lIdx, wIdx}
	})()).toEqual({lIdx: 0, wIdx: 2})

	expect((() => {
		const {lIdx, wIdx} = modifier({line: [['A', 'B'], ['C']], 
			lIdx: 1, wIdx: 1,}, {type: "ArrowUp"})
		return {lIdx, wIdx}
	})()).toEqual({lIdx: 0, wIdx: 1})
})

test('Down Scrolling', () => {
	expect((() => {
		const {lIdx, wIdx} = modifier({line: [['A', 'B']], 
			lIdx: 0, wIdx: 1,}, {type: "ArrowDown"})
		return {lIdx, wIdx}
	})()).toEqual({lIdx: 0, wIdx: 1})

	expect((() => {
		const {lIdx, wIdx} = modifier({line: [['A', 'B'], ['C']], 
			lIdx: 0, wIdx: 2,}, {type: "ArrowDown"})
		return {lIdx, wIdx}
	})()).toEqual({lIdx: 1, wIdx: 1})

	expect((() => {
		const {lIdx, wIdx} = modifier({line: [['A', 'B'], ['C']], 
			lIdx: 2, wIdx: 1,}, {type: "ArrowDown"})
		return {lIdx, wIdx}
	})()).toEqual({lIdx: 1, wIdx: 1})
})

test('Caret Blinking', () => {
	expect(modifier({caretOn: true}, 
	{type: 'hide-caret'}).caretOn).toBeFalsy()

	expect(modifier({caretOn: false}, 
	{type: 'show-caret'}).caretOn).toBeTruthy()
})
