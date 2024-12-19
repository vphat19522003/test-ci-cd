type LabelPropsType = {
  title?: string;
  required?: boolean;
};

const Label = ({ title, required }: LabelPropsType): JSX.Element => {
  return (
    <label className='font-medium text-md whitespace-nowrap'>
      {title}&nbsp;
      {required && <span className='text-red-500'>*</span>}
    </label>
  );
};

export default Label;
