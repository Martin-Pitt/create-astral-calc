import { useCallback, useEffect } from 'preact/hooks';
import { signal } from '@preact/signals';
import {
	Hardness,
	MillingRecipeDurations,
	CrushingRecipeDurations,
	BeltMovementPerRotation,
	PressingCycle,
	PressingCooldown,
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


function onRPM(event) {
	state.rpm.value = event.target.valueAsNumber;
}

function RPM(props) {
	return (
		<label>RPM: <input
			type="number"
			value={state.rpm.value}
			min="1"
			max="256"
			onInput={onRPM}
		/></label>
	)
}

function onStack(event) {
	state.stack.value = event.target.valueAsNumber;
}

function StackSize(props) {
	return (
		<label>Stack Size: <input
			type="number"
			value={state.stack.value || 1}
			min="1"
			max="64"
			onInput={onStack}
		/></label>
	);
}

function onMachines(event) {
	state.machines.value = event.target.valueAsNumber;
}

const selectedBlockHardness = signal(null);
function onBlock(event) {
	state.hardness.value = Hardness[event.target.value];
	selectedBlockHardness.value = event.target.value;
}
function BlockHardness(props) {
	return (
		<label>Block: <select onInput={onBlock}>
				<option disabled selected>‹ Select ›</option>
				{Object.keys(Hardness).map(block => <option selected={selectedBlockHardness.value === block}>{block}</option>)}
			</select>
		</label>
	);
}


const selectedRecipeDuration = signal(null);
function RecipeDuration(props) {
	const onRecipeDuration = useCallback(event => {
		state.recipeDuration.value = props.list[event.target.value];
		selectedRecipeDuration.value = event.target.value;
	}, [props.list]);
	
	return (
		<label>Recipe: <select onInput={onRecipeDuration}>
				<option disabled selected>‹ Select ›</option>
				{Object.keys(props.list).map(recipe => <option selected={selectedRecipeDuration.value === recipe}>{recipe}</option>)}
			</select>
		</label>
	);
}


export function Drill(props) {
	return (
		<div class="process drill">
			<div class="config">
				<RPM/>
				<BlockHardness/>
			</div>
			<img class="block" srcSet="assets/blocks/Mechanical_Drill.webp 2x"/>
			<div class="output">
				{+timeToDrill(state.rpm.value, state.hardness.value || Hardness.Stone).toFixed(2)}s
			</div>
		</div>
	)
}

export function Mill(props) {
	return (
		<div class="process mill">
			<div class="config">
				<RPM/>
				<RecipeDuration list={MillingRecipeDurations}/>
			</div>
			<img class="block" srcSet="assets/blocks/Millstone.webp 2x"/>
			<div class="output">
				{+timeToMill(state.rpm.value, state.recipeDuration.value || 100).toFixed(2)}s
			</div>
		</div>
	)
}

export function Crush(props) {
	// timeToCrush(rpm, recipeDuration = 100, stack = 1, inputDelay = 3)
	return (
		<div class="process crush">
			<div class="config">
				<RPM/>
				<RecipeDuration list={CrushingRecipeDurations}/>
				<StackSize/>
			</div>
			<img class="block" srcSet="assets/blocks/Crushing_Wheel.webp 2x"/>
			<div class="output">
				{+timeToCrush(state.rpm.value, state.recipeDuration.value || 100, state.stack.value || 1, state.inputDelay.value || 3).toFixed(2)}s
			</div>
		</div>
	)
}

export function BulkProcess(props) {
	// timeToBulkProcess(stack = 1, fans = 1)
	return (
		<div class="process bulkprocess">
			<div class="config">
				<StackSize/>
				<label><abbr title="Multiple fans applying the same processing effect on the same block divide the processing time">Overlapping</abbr>: <input
					type="number"
					value={state.machines.value || 1}
					min="1"
					onInput={onMachines}
				/>x</label>
			</div>
			<img class="block" srcSet="assets/blocks/Encased_Fan.webp 2x"/>
			<div class="output">
				{+timeToBulkProcess(state.stack.value, state.machines.value || 1).toFixed(2)}s
			</div>
		</div>
	)
}

export function Belt(props) {
	// timeToBelt(rpm)
	return (
		<div class="process belt">
			<div class="config">
				<RPM/>
			</div>
			<img class="block" srcSet="assets/blocks/Mechanical_Belt_Block.webp 2x"/>
			<div class="output">
				{+timeToBelt(state.rpm.value).toFixed(2)} items per second
			</div>
		</div>
	)
}

export function Mix(props) {
	// timeToMix(rpm, recipeSpeed = 1)
	return (
		<div class="process mix">
			<div class="config">
				<RPM/>
			</div>
			<img class="block" srcSet="assets/blocks/Mechanical_Mixer.webp 2x"/>
			<div class="output">
				{+timeToMix(state.rpm.value, state.recipeSpeed.value || 1).toFixed(2)}s
			</div>
			{state.rpm.value < 32? <div>RPM too low to mix</div> : null}
		</div>
	)
}

export function Press(props) {
	// timeToPress(rpm)
	return (
		<div class="process press">
			<div class="config">
				<RPM/>
			</div>
			<img class="block" srcSet="assets/blocks/Mechanical_Press.webp 2x"/>
			<div class="output">
				{+timeToPress(state.rpm.value).toFixed(2)}s
			</div>
		</div>
	)
}