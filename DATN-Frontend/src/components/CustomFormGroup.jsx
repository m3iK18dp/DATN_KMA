import { forwardRef } from 'react';
import { Form } from 'react-bootstrap';

const CustomFormGroup = forwardRef(
	(
		{
			className = 'mb-3',
			controlId = null,
			func = null,
			placeholder = '',
			label,
			prop = controlId,
			value = undefined,
			warning = null,
			formControlStyle,
			type = 'text',
			readonly = false,
			funcEnter,
			formGroupStyle,
			disabled = false,
			style = {},
			styleLabel = {}
		},
		ref,
	) => {
		return (
			<Form.Group
				className={className}
				controlId={controlId}
				style={formGroupStyle}
			>
				<Form.Label style={{ ...styleLabel }}>{label}</Form.Label>
				<Form.Control
					style={formControlStyle}
					type={type}
					onChange={(event) => {
						if (func !== null) func(prop, event.target.value);
					}}
					placeholder={placeholder}
					required
					ref={ref}
					{...(value !== null ? { value: value } : {})} // <-- bổ sung điều kiện kiểm tra value
					readOnly={readonly}
					onKeyDown={(event) => {
						if (event.key === 'Enter') {
							event.preventDefault();
							if (!readonly) funcEnter();
						}
					}}
					disabled={disabled}
				/>
				{
					warning !== null && (
						<p
							style={{
								fontStyle: 'italic',
								color: 'red',
								margin: 0,
								fontSize: 12,
								...style
							}}
						>
							{warning}
						</p>
					)
				}
			</Form.Group >
		);
	},
);

export default CustomFormGroup;
