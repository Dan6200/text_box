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
		const {lIdx, wIdx} = modifier({lIdx: 0, wIdx: 1,}, {type: "ArrowLeft"})
		return {lIdx, wIdx}
	})()).toEqual({lIdx: 0, wIdx: 0})

	expect((() => {
		const {lIdx, wIdx} = modifier({lIdx: 0, wIdx: 0,}, {type: "ArrowLeft"})
		return {lIdx, wIdx}
	})()).toEqual({lIdx: 0, wIdx: 0})

	expect((() => {
		const {lIdx, wIdx} = modifier({line: [['A', 'B'], ['C']], 
			lIdx: 1, wIdx: 0,}, {type: "ArrowLeft"})
		return {lIdx, wIdx}
	})()).toEqual({lIdx: 0, wIdx: 2})
})



