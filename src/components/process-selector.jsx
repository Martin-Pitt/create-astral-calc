import classNames from 'classnames';
import { state } from '../state';

function onProcess(event) {
	state.process.value = event.target.dataset.process;
}

export function ProcessSelector(props) {
	const processes = {
		drill: 'Drill',
		mill: 'Mill',
		crush: 'Crush',
		bulk: 'Bulk Process',
		belt: 'Belt',
		mix: 'Mix',
		press: 'Press',
		// saw: 'Saw',
		pump: 'Pump',
	};
	
	return (
		<div class="process-selector">
			{Object.entries(processes).map(([ process, label ]) =>
				<button
					class={classNames('process', { 'is-selected': process === state.process.value })}
					data-process={process}
					onClick={onProcess}
				>
					{label}
				</button>
			)}
		</div>
	);
}