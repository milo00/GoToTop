import React from 'react';
import { useState } from 'react';

const SwitchButton = ({leftLabel, rightLabel, currentState, currentStateHandler}) => {
    const [buttonState, setButtonState] = useState(currentState);

    const onChangeHandler = () => {
        setButtonState(!buttonState);
        currentStateHandler(buttonState);
    }
    
    return (
        <form className="switch-field">
            <div className='switchButton__conteiner'>
            <input type="radio" id="switch_left" name="switchToggle"
                value={leftLabel}
                onChange={onChangeHandler}                
                checked={!currentState}/>
            <label htmlFor="switch_left">
                {leftLabel}</label>

            <input type="radio" id="switch_right" name="switchToggle"
                value={rightLabel}
                onChange={onChangeHandler}
                checked={currentState}/>
            <label htmlFor="switch_right">
                {rightLabel}</label>
                </div>
        </form>
    );

}

export default SwitchButton;
