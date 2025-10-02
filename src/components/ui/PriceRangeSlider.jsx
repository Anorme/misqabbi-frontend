import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const PriceRangeSlider = ({
  min = 0,
  max = 5000,
  minValue,
  maxValue,
  onChange,
  className = '',
}) => {
  const handleChange = value => {
    if (Array.isArray(value)) {
      onChange({ minValue: value[0], maxValue: value[1] });
    }
  };

  return (
    <div className={`${className}`}>
      <Slider
        range
        min={min}
        max={max}
        value={[minValue, maxValue]}
        onChange={handleChange}
        styles={{
          track: {
            backgroundColor: '#D4AF37', // msq-gold-light
            height: 8,
          },
          handle: {
            backgroundColor: '#630254', // msq-purple-deep
            borderColor: '#630254',
            height: 20,
            width: 20,
            marginTop: -6,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
          rail: {
            backgroundColor: '#E5E7EB', // gray-200
            height: 8,
          },
        }}
        dotStyle={{
          backgroundColor: '#E5E7EB',
          borderColor: '#E5E7EB',
        }}
        activeDotStyle={{
          backgroundColor: '#630254',
          borderColor: '#630254',
        }}
      />
    </div>
  );
};

export default PriceRangeSlider;
