import { forwardRef, Ref } from 'react';

const TestComponent = forwardRef(
  (
    props: {
      test: string;
    },
    test: Ref<HTMLInputElement>
  ) => {
    return <div></div>;
  }
);

export default TestComponent;
