import { signal, effect, computed } from '@preact/signals';

export const state = {
	process: signal('none'),
	
	rpm: signal(16),
	hardness: signal(null),
	stack: signal(null),
	machines: signal(1),
	recipeDuration: signal(null),
	recipeSpeed: signal(null),
	inputDelay: signal(null),
};

// timeToDrill(rpm, hardness)
// timeToMill(rpm, recipeDuration = 100)
// timeToCrush(rpm, recipeDuration = 100, stack = 1, inputDelay = 3)
// timeToBulkProcess(stack = 1, fans = 1)
// timeToBelt(rpm)
// timeToMix(rpm, recipeSpeed = 1)
// timeToPress(rpm)