import React, { useState } from "react";
import { Button, RangeSlider, SliderMark, RangeSliderTrack, RangeSliderFilledTrack, Tooltip, RangeSliderThumb } from "@chakra-ui/react";

const YearSelector = ( {setYearRange} ) => {

    const [showYears, setShowYears] = useState(false);
    const [sliderValue, setSliderValue] = useState([1950, 1975])
    const [showTooltip, setShowTooltip] = useState(false)

    return (
    <div style={{width:"100%", textAlign:"center"}}>
        <Button
            mb={10}
            colorScheme='teal'
            type='submit'
            p={'20px'}
            width='40%'
            alignSelf={'center'}
            onClick={() => {setShowYears(!showYears);}}>
            Set the years of your prefered music
        </Button>
        { showYears 
        ?             
        <div>
            <RangeSlider
                defaultValue={[1950, 1975]}
                min={1950}
                max={2023}
                aria-label={['min', 'max']}
                colorScheme='teal'
                mb={10}
                width={"80%"}
                onChange={(val) => setSliderValue(val)}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onChangeEnd={(val) => setYearRange(val)}>
                <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <Tooltip
                    hasArrow
                    bg='teal.500'
                    color='white'
                    placement='top'
                    closeOnClick={false}
                    label={`${sliderValue[0]}`}>
                    <RangeSliderThumb index={0}/>
                </Tooltip>
                <Tooltip
                    hasArrow
                    bg='teal.500'
                    color='white'
                    placement='top'
                    closeOnClick={false}
                    label={`${sliderValue[1]}`}>
                    <RangeSliderThumb index={1}/>
                </Tooltip>
            </RangeSlider>
        </div>
        : 
        null }
    </div>)
}

export default YearSelector;