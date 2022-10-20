import React from 'react';
import styled from 'styled-components';
// import { UseRefExample1 } from './components/UseRefExample1';
// import { UseRefExample2 } from './components/UseRefExample2';
// import { UseRefExample3 } from './components/UseRefExample3';
// import { UseMemoExample } from './components/UseMemoExample';
// import { UseCallbackExample } from './components/UseCallbackExample';
// import { CustomHookExample1 } from './components/CustomHookExample1';
import { CustomHookExample2 } from './components/CustomHookExample2';

export const Sandbox = () => (
  <SandboxContainer>
    <CustomHookExample2 />
  </SandboxContainer>
);

export const SandboxContainer = styled.div({
  padding: 20,
});
