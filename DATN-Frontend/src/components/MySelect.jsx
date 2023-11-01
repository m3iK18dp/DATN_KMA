import React from 'react';
import { Form } from 'react-bootstrap';
const MySelect = ({ check, setCheck, all, disabled = false }) => {
	const handleChecks = (event, oneInAll) => {
		const isChecked = event.target.checked;
		if (isChecked) {
			setCheck([...Array.from(check), oneInAll.id]);
		} else {
			setCheck(Array.from(check).filter((checkId) => checkId !== oneInAll.id));
		}
	};
	return (
		<div
			style={{
				backgroundColor: 'rgba(255, 255, 255, 0.1)',
				maxHeight: 70,
				overflow: 'auto',
				color: 'white',
			}}
		>
			{Array.from(all).map((oneInAll) => (
				<div key={oneInAll.id}>
					<Form.Check
						disabled={disabled}
						type='checkbox'
						label={oneInAll.name}
						name={oneInAll.name}
						value={oneInAll.id}
						checked={Array.from(check).find(
							(oneInCheck) => oneInCheck === oneInAll.id,
						)}
						onChange={(event) => {
							handleChecks(event, oneInAll);
						}}
					/>
				</div>
			))}
		</div>
	);
};

export default MySelect;
