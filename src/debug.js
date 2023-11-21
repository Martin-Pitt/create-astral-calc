import { state } from './state';
import {
	ItemNames,
	Hardness,
	MillingRecipeDurations,
	CrushingRecipeDurations,
	BeltMovementPerRotation,
	PressingCycle,
	PressingEntityScan,
	Config,
} from './data/create';
import {
	timeToDrill,
	timeToMill,
	timeToCrush,
	timeToBulkProcess,
	timeToBelt,
	timeToMix,
	timeToPress,
} from './lib/calc';

// For playing with DevTools
window.state = state;
window.ItemNames = ItemNames;
window.Hardness = Hardness;
window.MillingRecipeDurations = MillingRecipeDurations;
window.CrushingRecipeDurations = CrushingRecipeDurations;
window.BeltMovementPerRotation = BeltMovementPerRotation;
window.PressingCycle = PressingCycle;
window.PressingEntityScan = PressingEntityScan;
window.Config = Config;
window.timeToDrill = timeToDrill;
window.timeToMill = timeToMill;
window.timeToCrush = timeToCrush;
window.timeToBulkProcess = timeToBulkProcess;
window.timeToBelt = timeToBelt;
window.timeToMix = timeToMix;
window.timeToPress = timeToPress;