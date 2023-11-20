import { state } from './state';
import {
	Hardness,
	MillingRecipeDurations,
	CrushingRecipeDurations,
	BeltMovementPerRotation,
	PressingCycle,
	PressingCooldown,
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
import {
	Drill,
	Mill,
	Crush,
	BulkProcess,
	Belt,
	Mix,
	Press,
} from './components/processes';
import { ProcessSelector } from './components/process-selector';


// For playing with DevTools
window.state = state;
window.Hardness = Hardness;
window.MillingRecipeDurations = MillingRecipeDurations;
window.CrushingRecipeDurations = CrushingRecipeDurations;
window.BeltMovementPerRotation = BeltMovementPerRotation;
window.PressingCycle = PressingCycle;
window.PressingCooldown = PressingCooldown;
window.Config = Config;
window.timeToDrill = timeToDrill;
window.timeToMill = timeToMill;
window.timeToCrush = timeToCrush;
window.timeToBulkProcess = timeToBulkProcess;
window.timeToBelt = timeToBelt;
window.timeToMix = timeToMix;
window.timeToPress = timeToPress;


export function App(props) {
	let Process = {
		drill: Drill,
		mill: Mill,
		crush: Crush,
		bulk: BulkProcess,
		belt: Belt,
		mix: Mix,
		press: Press,
	}[state.process.value];
	
	return (
		<main class="page index">
			<ProcessSelector/>
			{Process? <Process/> : <div/>}
			<footer>
				<div class="left">
					Formulas interpretted from <a href="https://create.fandom.com/">wiki</a> descriptions &amp; <a href="https://github.com/Fabricators-of-Create/Create">Create source code</a><br/>
					Might not be 100%, anyone wanna double-check the code/numbers?<br/>
					Server config can also affect timings<br/>
					<br/>
					Issues or suggestions? See the <a href="https://github.com/Martin-Pitt/create-astral-calc/issues">github repository</a>
				</div>
				<div class="right">
					<span class="name">Calculator for <a href="https://www.curseforge.com/minecraft/modpacks/create-astral">Create: Astral</a></span><br/>
					<br/>
					<span class="author">Made by Nexii</span><br/>
					<br/>
					<time class="generated" datatime={import.meta.env.GENERATED_AT}>
						Last updated {new Date(import.meta.env.GENERATED_AT).toISOString().substring(0, 10)}
					</time>
				</div>
			</footer>
			
		</main>
	);
}






// timeToDrill(rpm, hardness)
// timeToMill(rpm, recipeDuration = 100)
// timeToCrush(rpm, recipeDuration = 100, stack = 1, inputDelay = 3)
// timeToBulkProcess(stack = 1, fans = 1)
// timeToBelt(rpm)
// timeToMix(rpm, recipeSpeed = 1)
// timeToPress(rpm)

// timeToDrill(64, Hardness.Stone) / timeToMill(128, MillingRecipeDurations.Cobblestone)



/*
	let combos = [];
	for(let x = 1; x <= 8; ++x)
	{
		for(let y = 1; y <= 8; ++y)
		{
			let a = Math.pow(2, x);
			let b = Math.pow(2, y);
			
			let d = timeToDrill(a, Hardness.Stone);
			
			// let m = timeToMill(b, MillingRecipeDurations.Cobblestone);
			// let t = d / m;
			// combos.push({ a, b,  d, m,  t });
			
			let c = timeToCrush(b, CrushingRecipeDurations.Cobblestone, 64, 3);
			let t = d / c;
			combos.push({ a, b,  d, c,  t });
		}
	}
	
	let filtered = combos.filter(combo => combo.t <= 1.0).sort((a, b) => {
		if(a.t > b.t) return -1;
		if(a.t < b.t) return 1;
		return 0;
	});
	
	console.log(filtered);
	window.combos = combos;
	window.filtered = filtered;
*/
