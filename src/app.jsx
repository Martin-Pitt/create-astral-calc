import { state } from './state';
import { Drill, Mill, Crush, BulkProcess, Belt, Mix, Press, Saw, Pump } from './components/processes';
import { ProcessSelector } from './components/process-selector';
import './debug';
import logoAstral from './assets/logo-astral.webp';


export function App(props) {
	let Process = {
		drill: Drill,
		mill: Mill,
		crush: Crush,
		bulk: BulkProcess,
		belt: Belt,
		mix: Mix,
		press: Press,
		saw: Saw,
		pump: Pump,
	}[state.process.value];
	
	return (
		<main class="page index">
			<ProcessSelector/>
			{Process? <Process/> : (
				<div class="app-title">
					<img class="logo" srcSet={`${logoAstral} 2x`} alt="Create: Astral Calculator"/>
				</div>
			)}
			<footer>
				<div class="left">
					Formulas interpretted from <a href="https://create.fandom.com/">wiki</a> descriptions &amp; <a href="https://github.com/Fabricators-of-Create/Create">Create source code</a><br/>
					Might not be 100%, anyone wanna double-check the code/numbers?<br/>
					Server config can also affect timings<br/>
					<br/>
					Issues or suggestions? See the <a href="https://github.com/Martin-Pitt/create-astral-calc/issues">github repository</a>
				</div>
				<div class="right">
					<span class="name">Unofficial calculator for <a href="https://www.curseforge.com/minecraft/modpacks/create-astral">Create: Astral</a></span><br/>
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
