import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

const CustomCheckbox = (props) => {
    const { checkboxName } = props;
    const handleChangeCheckbox = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const [state, setState] = React.useState({
        checkedB: true,
    });
    return (
        <Checkbox
            checked={state.checkedB}
            onChange={handleChangeCheckbox}
            name="checkedB"
            color="primary"
        />
    );
};

export default CustomCheckbox;
