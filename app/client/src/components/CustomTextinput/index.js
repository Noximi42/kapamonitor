import React, { useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const TextInput = (props) => {
    const [name, setName] = React.useState('');
    const { title, initialName } = props;

    const handleChangeTextInput = (event) => {
        setName(event.target.value);
    };
    return (
        <div class="container-fluid">
            <FormControl>
                <InputLabel htmlFor="component-simple">{title}</InputLabel>
                <Input
                    id="component-simple"
                    value={initialName}
                    onChange={handleChangeTextInput}
                />
            </FormControl>
        </div>
    );
};

export default TextInput;
