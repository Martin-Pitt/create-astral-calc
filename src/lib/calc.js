import {
	Config,
	BeltMovementPerRotation,
	PressingCooldown,
	PressingCycle,
} from '../data/create';


export function timeToDrill(rpm, hardness) {
	// https://create.fandom.com/wiki/Mechanical_Drill#Breaking_Blocks
	return (45 * hardness) / rpm;
}

export function timeToMill(rpm, recipeDuration = 100) {
	// https://create.fandom.com/wiki/Millstone#Throughput_Formulas
	let mpf = Math.abs(rpm / 16);
	let ticksPerRecipe = Math.ceil(recipeDuration / mpf) + 1;
	let secPerRecipe = ticksPerRecipe / 20;
	return secPerRecipe;
}

export function timeToCrush(rpm, recipeDuration = 100, stack = 1, inputDelay = 3) {
	recipeDuration -= 19.99999; // Create code skips from less than 20 time remaining
	let crushingSpeed = (rpm / 50) * 4;
	let processingSpeed = Math.min(Math.max(crushingSpeed / Math.log2(stack), 0.25), 20);
	let ticks = (Math.ceil(recipeDuration / processingSpeed) + inputDelay);
	return ticks / 20;
}

export function timeToBulkProcess(stack = 1, fans = 1) {
	let modifier = Math.floor((stack - 1) / 16 + 1);
	let ticks = Config.FanInWorldProcessingTime * modifier;
	return ticks / 20 / fans;
}

export function timeToBelt(rpm) {
	return BeltMovementPerRotation * rpm;
}

export function timeToMix(rpm, recipeSpeed = 1) {
	if(rpm < 32) return Infinity; // Cannot mix below 32 RPM
	let ticks = Math.min(Math.max(Math.log2(512 / rpm) * Math.ceil(recipeSpeed * 15) + 1, 1), 512);
	return ticks / 20;
}

export function timeToPress(rpm) {
	let t = Math.min(Math.max(rpm / 512, 0), 1);
	let x = 1, y = 60;
	let tickSpeed = Math.round(x*(1-t) + y*t);
	return ((PressingCycle + PressingCooldown) / tickSpeed) / 20;
}
