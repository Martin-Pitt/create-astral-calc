import classNames from 'classnames';
import { state } from '../state';
import Preview_Mechanical_Drill from '../assets/blocks/Mechanical_Drill.webp';
import Preview_Millstone from '../assets/blocks/Millstone.webp';
import Preview_Crushing_Wheel from '../assets/blocks/Crushing_Wheel.webp';
import Preview_Encased_Fan from '../assets/blocks/Encased_Fan.webp';
import Preview_Mechanical_Belt_Block from '../assets/blocks/Mechanical_Belt_Block.webp';
import Preview_Mechanical_Mixer from '../assets/blocks/Mechanical_Mixer.webp';
import Preview_Mechanical_Press from '../assets/blocks/Mechanical_Press.webp';


function onProcess(event) {
	state.process.value = event.target.dataset.process;
}

export function ProcessSelector(props) {
	const processes = {
		drill: { label: 'Drill', icon: Preview_Mechanical_Drill },
		mill: { label: 'Mill', icon: Preview_Millstone },
		crush: { label: 'Crush', icon: Preview_Crushing_Wheel },
		bulk: { label: 'Bulk Process', icon: Preview_Encased_Fan },
		belt: { label: 'Belt', icon: Preview_Mechanical_Belt_Block },
		mix: { label: 'Mix', icon: Preview_Mechanical_Mixer },
		press: { label: 'Press', icon: Preview_Mechanical_Press },
		// saw: { label: 'Saw', icon: Preview_Mechanical_Saw },
		pump: { label: 'Pump' },
	};
	
	return (
		<div class="process-selector">
			{Object.entries(processes).map(([ process, { label, icon } ]) =>
				<button
					class={classNames('process', { 'is-selected': process === state.process.value })}
					data-process={process}
					onClick={onProcess}
				>
					{icon && <img class="icon" srcSet={`${icon} 2x`}/>}
					{label}
				</button>
			)}
		</div>
	);
}