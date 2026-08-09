import React from 'react';
import { Result } from 'antd';
import CTAButton from './CTAButton';

const CommonError: React.FC = () => (
  <Result
    status="warning"
    title="Something went wrong"
    extra={
        <CTAButton
            className="px-4 py-2"
            reactNode={<span className='font-semibold'>Try Again</span>}
            onClick={() => window.location.reload()}
        />
    }
  />
);

export default CommonError;