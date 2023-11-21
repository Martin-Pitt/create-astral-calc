import { signal, effect, computed } from '@preact/signals';

export const state = {
	process: signal('none'),
	
	drill: {
		rpm: signal(64),
		hardness: signal(null),
	},
	mill: {
		rpm: signal(64),
		recipeDuration: signal(null),
	},
	crush: {
		rpm: signal(64),
		recipeDuration: signal(null),
		stack: signal(1),
		inputDelay: signal(null),
	},
	bulk: {
		stack: signal(1),
		machines: signal(1),
	},
	belt: {
		rpm: signal(64),
	},
	mix: {
		rpm: signal(64),
		recipeSpeed: signal(null),
	},
	press: {
		rpm: signal(64),
	},
	saw: {
		rpm: signal(64),
		recipeDuration: signal(null),
	},
	
	
	// rpm: signal(16),
	// hardness: signal(null),
	// stack: signal(null),
	// machines: signal(1),
	// recipeDuration: signal(null),
	// recipeSpeed: signal(null),
	// inputDelay: signal(null),
};

// timeToDrill(rpm, hardness)
// timeToMill(rpm, recipeDuration = 100)
// timeToCrush(rpm, recipeDuration = 100, stack = 1, inputDelay = 3)
// timeToBulkProcess(stack = 1, fans = 1)
// timeToBelt(rpm)
// timeToMix(rpm, recipeSpeed = 1)
// timeToPress(rpm)