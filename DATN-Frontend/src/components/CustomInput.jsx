import { Col, Form } from 'react-bootstrap';

function CustomInput({
	set,
	get,
	field = '',
	type = 'text',
	min = 'none',
	func,
	size,
}) {
	const lowerCaseField = field.toLowerCase();
	return (
		<>
			<Col className='col'>
				<Form.Label
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						color: 'white',
					}}
				>
					{field}
				</Form.Label>
			</Col>
			<Col className='col' lg={size}>
				<Form.Control
					type={type}
					min={min}
					onKeyDown={(event) => {
						if (event.key === 'Enter') {
							event.preventDefault();
							func();
						}
					}}
					placeholder={`Enter Search with ${field}`}
					value={get(lowerCaseField).toString()}
					onChange={(event) => {
						set(lowerCaseField, event.target.value);
					}}
					style={{ padding: '5px 10px' }}
				/>
			</Col>
		</>
	);
}

export default CustomInput;
