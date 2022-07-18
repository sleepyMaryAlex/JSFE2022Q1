import React from 'react';
import { IRangeContext, IRangeState } from '../../../types/types';
import './Range.css';

const Range = (props: IRangeContext) => {
    const [rangeState, setRangeState] = React.useState<IRangeState>(props.state);

    const minGap = 0;
    const inputOneRef = React.useRef<HTMLInputElement>(null);
    const inputTwoRef = React.useRef<HTMLInputElement>(null);
    const trackRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const inputOne = inputOneRef.current as HTMLInputElement;
        const inputTwo = inputTwoRef.current as HTMLInputElement;

        inputOne.value = String(props.state.minValue);
        inputTwo.value = String(props.state.maxValue);

        setRangeState(props.state);
    }, [props.state.minValue, props.state.maxValue]);

    const updateMinValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;

        const inputTwo = inputTwoRef.current as HTMLInputElement;

        target.classList.add('input_active');
        inputTwo.classList.remove('input_active');

        target.value =
            rangeState.maxValue - Number(target.value) <= minGap ? String(rangeState.maxValue - minGap) : target.value;

        setRangeState({ minValue: Number(target.value), maxValue: rangeState.maxValue });
    };

    const updateMaxValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;

        const inputOne = inputOneRef.current as HTMLInputElement;

        inputOne.classList.remove('input_active');
        target.classList.add('input_active');

        target.value =
            Number(target.value) - rangeState.minValue <= minGap ? String(rangeState.minValue + minGap) : target.value;

        setRangeState({ minValue: rangeState.minValue, maxValue: Number(target.value) });
    };

    React.useEffect(() => {
        props.onChange(rangeState);
        fillColor();
    }, [rangeState.minValue, rangeState.maxValue]);

    const fillColor = () => {
        const track = trackRef.current as HTMLDivElement;

        const percent = (props.max - props.min) / 100;
        const percent1 = Math.floor((rangeState.minValue - props.min) / percent);
        const percent2 = Math.floor((rangeState.maxValue - props.min) / percent);
        track.style.background = `linear-gradient(to right, rgba(0, 0, 0, 0.384) ${percent1}%, #000 ${percent1}%, #000 ${percent2}%, rgba(0, 0, 0, 0.384) ${percent2}%)`;
    };

    return (
        <div className="range">
            <div className={`${props.title}__values values`}>
                <span className={`${props.title}__value_1`}>
                    {props.title === 'price' ? `${rangeState.minValue} USD` : rangeState.minValue}
                </span>
                <span> - </span>
                <span className={`${props.title}__value_2`}>
                    {props.title === 'price' ? `${rangeState.maxValue} USD` : rangeState.maxValue}
                </span>
            </div>
            <div className={`${props.title}__container range-container`}>
                <div className={`${props.title}__track range-track`} ref={trackRef}></div>
                <input
                    className={`${props.title}__input_1 range-input`}
                    type="range"
                    min={props.min}
                    max={props.max}
                    step="1"
                    defaultValue={rangeState.minValue}
                    onChange={updateMinValue}
                    ref={inputOneRef}
                    data-type={props.title}
                />
                <input
                    className={`${props.title}__input_2 range-input`}
                    type="range"
                    min={props.min}
                    max={props.max}
                    step="1"
                    defaultValue={rangeState.maxValue}
                    onChange={updateMaxValue}
                    ref={inputTwoRef}
                    data-type={props.title}
                />
            </div>
        </div>
    );
};

export default Range;
