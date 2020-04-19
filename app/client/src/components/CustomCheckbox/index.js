import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

const CustomCheckbox = (props) => {
    const { checkboxId } = props;
    const handleChangeCheckbox = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        var targetId = event.target.id;
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
            id={checkboxId}
        />
    );
};

export default CustomCheckbox;
