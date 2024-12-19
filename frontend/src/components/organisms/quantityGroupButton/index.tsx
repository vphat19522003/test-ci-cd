import { Add, Remove } from '@mui/icons-material';
import { ButtonGroup } from '@mui/material';

import ButtonForm from '@app/components/atoms/button';
import NumberField from '@app/components/atoms/numberFormatCustom';

type QuantityGroupButtonProps = {
  quantity: number;
  onDecreaseQuantity: () => void;
  onIncreaseQuantity: () => void;
  onChangeQuantity: (value: string) => void;
  isPending?: boolean;
};
const QuantityGroupButton = ({
  quantity,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onChangeQuantity,
  isPending
}: QuantityGroupButtonProps): JSX.Element => {
  return (
    <ButtonGroup variant='outlined' sx={{ height: '40px' }}>
      <ButtonForm
        className='border-[1px] border-solid border-slate-200'
        sx={{ width: '40px', minWidth: '40px', height: '42px', padding: '0' }}
        onClick={() => onDecreaseQuantity()}
        disabled={isPending}>
        <Remove className='text-lg' />
      </ButtonForm>
      <NumberField
        decimalScale={0}
        variant='outlined'
        defaultValue={1}
        value={quantity || 1}
        className='w-[58px] mr-1 ml-[2px]'
        backgroundColor='white'
        onBlur={(e) => onChangeQuantity(e.target.value)}
        readOnly={isPending}
      />
      <ButtonForm
        className='border-[1px] border-solid border-slate-200'
        sx={{ width: '40px', minWidth: '40px', height: '42px', padding: '0' }}
        onClick={() => onIncreaseQuantity()}
        disabled={isPending}>
        <Add className='text-lg' />
      </ButtonForm>
    </ButtonGroup>
  );
};

export default QuantityGroupButton;
