import { useCallback, useEffect } from 'preact/hooks';
import { signal } from '@preact/signals';
import {
	Hardness,
	MillingRecipeDurations,
	CrushingRecipeDurations,
	BeltMovementPerRotation,
	PressingCycle,
	PressingEntityScan,
	Config,
} from '../data/create';
import {
	timeToDrill,
	timeToMill,
	timeToCrush,
	timeToBulkProcess,
	timeToBelt,
	timeToMix,
	timeToPress,
} from '../lib/calc';
import Preview_Mechanical_Drill from '../assets/blocks/Mechanical_Drill.webp';
import Preview_Millstone from '../assets/blocks/Millstone.webp';
import Preview_Crushing_Wheel from '../assets/blocks/Crushing_Wheel.webp';
import Preview_Encased_Fan from '../assets/blocks/Encased_Fan.webp';
import Preview_Mechanical_Belt_Block from '../assets/blocks/Mechanical_Belt_Block.webp';
import Preview_Mechanical_Mixer from '../assets/blocks/Mechanical_Mixer.webp';
import Preview_Mechanical_Press from '../assets/blocks/Mechanical_Press.webp';


function onRPM(event) {
	state[state.process.value].rpm.value = event.target.valueAsNumber;
}

function RPM(props) {
	return (
		<label>RPM: <input
			type="number"
			value={state[state.process.value].rpm.value}
			min="1"
			max="256"
			onInput={onRPM}
		/></label>
	)
}

function onStack(event) {
	state[state.process.value].stack.value = event.target.valueAsNumber;
}

function StackSize(props) {
	return (
		<label>Stack Size: <input
			type="number"
			value={state[state.process.value].stack.value || 1}
			min="1"
			max="64"
			onInput={onStack}
		/></label>
	);
}

function onMachines(event) {
	state[state.process.value].machines.value = event.target.valueAsNumber;
}

function onBlock(event) {
	state[state.process.value].hardness.value = {
		block: event.target.value,
		number: Hardness[event.target.value]
	};
}

function BlockHardness(props) {
	const selectedBlock = state[state.process.value].hardness.value?.block;
	return (
		<label>Block: <select onInput={onBlock}>
				<option disabled selected>‹ Select ›</option>
				{Object.keys(Hardness).map(block => <option selected={selectedBlock === block}>{block}</option>)}
			</select>
		</label>
	);
}

function RecipeDuration(props) {
	const onRecipeDuration = useCallback(event => {
		state[state.process.value].recipeDuration.value = {
			recipe: event.target.value,
			duration: props.list[event.target.value],
		};
	}, [props.list]);
	
	const selectedRecipe = state[state.process.value].recipeDuration.value?.recipe;
	
	return (
		<label>Input: <select onInput={onRecipeDuration}>
				<option disabled selected>‹ Select ›</option>
				{Object.keys(props.list).map(recipe => <option selected={selectedRecipe === recipe}>{recipe}</option>)}
			</select>
		</label>
	);
}


export function Drill(props) {
	const rpm = state[state.process.value].rpm.value;
	const hardness = state[state.process.value].hardness.value?.number || Hardness.Stone;
	
	return (
		<div class="process drill">
			<div class="config">
				<RPM/>
				<BlockHardness/>
			</div>
			<img class="block" srcSet={`${Preview_Mechanical_Drill} 2x`}/>
			<div class="output">
				{+timeToDrill(rpm, hardness).toFixed(2)}s
			</div>
		</div>
	)
}

export function Mill(props) {
	const rpm = state[state.process.value].rpm.value;
	const recipeDuration = state[state.process.value].recipeDuration.value?.duration || 100;
	
	return (
		<div class="process mill">
			<div class="config">
				<RPM/>
				<RecipeDuration list={MillingRecipeDurations}/>
			</div>
			<img class="block" srcSet={`${Preview_Millstone} 2x`}/>
			<div class="output">
				{+timeToMill(rpm, recipeDuration).toFixed(2)}s
			</div>
		</div>
	)
}

export function Crush(props) {
	const rpm = state[state.process.value].rpm.value;
	const recipeDuration = state[state.process.value].recipeDuration.value?.duration || 100;
	const stack = state[state.process.value].stack.value || 1;
	const inputDelay = state[state.process.value].inputDelay.value || 3;
	
	return (
		<div class="process crush">
			<div class="config">
				<RPM/>
				<RecipeDuration list={CrushingRecipeDurations}/>
				<StackSize/>
			</div>
			<img class="block" srcSet={`${Preview_Crushing_Wheel} 2x`}/>
			<div class="output">
				{+timeToCrush(rpm, recipeDuration, stack, inputDelay).toFixed(2)}s
			</div>
		</div>
	)
}

export function BulkProcess(props) {
	const stack = state[state.process.value].stack.value || 1;
	const machines = state[state.process.value].machines.value || 1;
	
	return (
		<div class="process bulkprocess">
			<div class="config">
				<StackSize/>
				<label><abbr title="Multiple fans applying the same processing effect on the same block divide the processing time">Overlapping</abbr>: <input
					type="number"
					value={machines}
					min="1"
					max="6"
					onInput={onMachines}
				/>x</label>
			</div>
			<img class="block" srcSet={`${Preview_Encased_Fan} 2x`}/>
			<div class="output">
				{+timeToBulkProcess(stack, machines).toFixed(2)}s
			</div>
		</div>
	)
}

export function Belt(props) {
	const rpm = state[state.process.value].rpm.value;
	
	return (
		<div class="process belt">
			<div class="config">
				<RPM/>
			</div>
			<img class="block" srcSet={`${Preview_Mechanical_Belt_Block} 2x`}/>
			<div class="output">
				{+timeToBelt(rpm).toFixed(2)} items per second
			</div>
		</div>
	)
}

export function Mix(props) {
	const rpm = state[state.process.value].rpm.value;
	const recipeSpeed = state[state.process.value].recipeSpeed.value || 1;
	const time = timeToMix(rpm, recipeSpeed);
	
	return (
		<div class="process mix">
			<div class="config">
				<RPM/>
				{rpm < 32? <p class="warn-rpm">RPM too low to mix (&thinsp;&lt;&thinsp;32&thinsp;RPM&thinsp;)</p> : null}
			</div>
			<img class="block" srcSet={`${Preview_Mechanical_Mixer} 2x`}/>
			<div class="output">
				{isFinite(time)? +time.toFixed(2) : '∞'}s
			</div>
		</div>
	)
}

export function Press(props) {
	const rpm = state[state.process.value].rpm.value;
	
	return (
		<div class="process press">
			<div class="config">
				<RPM/>
			</div>
			<img class="block" srcSet={`${Preview_Mechanical_Press} 2x`}/>
			<div class="output">
				{+timeToPress(rpm).toFixed(2)}s
			</div>
		</div>
	)
}