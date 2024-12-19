import { AttachMoney } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';

import NumberField from '@app/components/atoms/numberFormatCustom';

type AmountRangeProps = {
  minValue?: number;
  maxValue?: number;
  handleOnChangeAmount: (min: number, max: number) => void;
};

const AmountRange = ({ minValue = 0, maxValue = 0, handleOnChangeAmount }: AmountRangeProps): JSX.Element => {
  return (
    <Stack>
      <Typography
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
          marginTop: '10px'
        }}>
        Tự nhập khoảng giá
      </Typography>
      <Stack
        direction={'row'}
        spacing={2}
        style={{
          marginTop: '14px',
          marginRight: '2px'
        }}
        alignItems={'center'}>
        <NumberField
          className='w-full border-8'
          variant='outlined'
          borderColorFocus='blue.700'
          backgroundColor='white'
          endAdornment={<AttachMoney />}
          placeholder='From'
          decimalScale={2}
          value={minValue}
          onChange={(e) => {
            const numericValue = parseFloat(e.target.value) || 0;
            handleOnChangeAmount(numericValue, maxValue);
          }}
        />
        <Typography>~</Typography>
        <NumberField
          className='w-full border-8'
          variant='outlined'
          borderColorFocus='blue.700'
          backgroundColor='white'
          endAdornment={<AttachMoney />}
          placeholder='To'
          decimalScale={2}
          value={maxValue}
          onChange={(e) => {
            const numericValue = parseFloat(e.target.value) || 0;
            handleOnChangeAmount(minValue, numericValue);
          }}
        />
      </Stack>
    </Stack>
  );
};

export default AmountRange;
