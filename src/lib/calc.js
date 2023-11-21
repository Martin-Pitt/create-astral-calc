import {
	Config,
	BeltMovementPerRotation,
	PressingEntityScan,
	PressingCycle,
} from '../data/create';


export function timeToDrill(rpm, hardness) {
	// https://create.fandom.com/wiki/Mechanical_Drill#Breaking_Blocks
	// https://github.com/Creators-of-Create/Create/blob/2201d87da7744cf9ee3f83e1e4c21643244f342b/src/main/java/com/simibubi/create/content/kinetics/base/BlockBreakingMovementBehaviour.java#L185-L186
	return (45 * hardness) / rpm;
}

export function timeToMill(rpm, recipeDuration = 100) {
	// https://create.fandom.com/wiki/Millstone#Throughput_Formulas
	// https://github.com/Creators-of-Create/Create/blob/2201d87da7744cf9ee3f83e1e4c21643244f342b/src/main/java/com/simibubi/create/content/kinetics/millstone/MillstoneBlockEntity.java#L186
	let mpf = Math.min(Math.max(Math.abs(rpm / 16), 1), 512);
	let ticksPerRecipe = Math.ceil(recipeDuration / mpf) + 1;
	let secPerRecipe = ticksPerRecipe / 20;
	return secPerRecipe;
}

export function timeToCrush(rpm, recipeDuration = 100, stack = 1, inputDelay = 3) {
	// https://create.fandom.com/wiki/Crushing_Wheel#Crushing_Speed
	// https://github.com/Creators-of-Create/Create/blob/2201d87da7744cf9ee3f83e1e4c21643244f342b/src/main/java/com/simibubi/create/content/kinetics/crusher/CrushingWheelControllerBlockEntity.java#L125-L139
	// inputDelay: { funnel: 1, chute: 3, thrown: 27 } // Be aware that the use of belts to feed the funnel will add more delay.
	recipeDuration -= 19.99999; // Create code skips from less than 20 time remaining
	let crushingSpeed = (rpm / 50) * 4;
	let processingSpeed = Math.min(Math.max(crushingSpeed / Math.log2(stack), 0.25), 20);
	let ticks = (Math.ceil(recipeDuration / processingSpeed) + inputDelay); // Wiki formula states to multiply this by stack size, but that can't be right?
	return ticks / 20;
}

export function timeToBulkProcess(stack = 1, fans = 1) {
	// https://github.com/Creators-of-Create/Create/blob/2201d87da7744cf9ee3f83e1e4c21643244f342b/src/main/java/com/simibubi/create/content/kinetics/fan/processing/FanProcessing.java#L58-L60
	let modifier = Math.floor((stack - 1) / 16 + 1);
	let ticks = Config.FanInWorldProcessingTime * modifier;
	return ticks / 20 / fans;
}

export function timeToBelt(rpm) {
	// https://create.fandom.com/wiki/Mechanical_Belt#Moving_Entities_and_Items:~:text=The%20belt%20moves%20items%20at%20approximately%202.5%20blocks%20per%20rotation
	return BeltMovementPerRotation * rpm;
}

export function timeToMix(rpm, recipeSpeed = 1) {
	// https://github.com/Creators-of-Create/Create/blob/2201d87da7744cf9ee3f83e1e4c21643244f342b/src/main/java/com/simibubi/create/content/kinetics/mixer/MechanicalMixerBlockEntity.java#L141-L148
	if(rpm < 32) return Infinity; // Cannot mix below 32 RPM
	let ticks = Math.min(Math.max(Math.log2(512 / rpm) * Math.ceil(recipeSpeed * 15) + 1, 1), 512);
	return ticks / 20;
}

export function timeToPress(rpm) {
	// https://github.com/Creators-of-Create/Create/blob/2201d87da7744cf9ee3f83e1e4c21643244f342b/src/main/java/com/simibubi/create/content/kinetics/press/PressingBehaviour.java#L240-L245
	let t = Math.min(Math.max(rpm / 512, 0), 1);
	let x = 1, y = 60;
	let tickSpeed = Math.round(x*(1-t) + y*t);
	return ((PressingCycle + PressingEntityScan) / tickSpeed) / 20;
}

export function timeToSaw(rpm, recipeDuration = 100) {
	// https://create.fandom.com/wiki/Mechanical_Saw
	// https://github.com/Creators-of-Create/Create/blob/2201d87da7744cf9ee3f83e1e4c21643244f342b/src/main/java/com/simibubi/create/content/kinetics/saw/SawBlockEntity.java#L171
	recipeDuration -= 20; // Create code skips from less than 5 time remaining
	let processingSpeed = Math.min(Math.max(rpm / 24, 1), 128);
	let ticks = Math.ceil(recipeDuration / processingSpeed) + 20;
	return ticks / 20;
}

/*
	16 * (60/((((100-20) / (32/24)) + 20)/20))
	
	(100 - 20 / (32/24)) + 20
	
*/
