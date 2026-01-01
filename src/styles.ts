import { css } from '@emotion/react';

export const labelStyle = css`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;
export const inputTextStyle = css`
  border: 1px solid black;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;

  &[aria-invalid="true"] {
    border: 1px solid red;

    &:focus {
      outline-color: red;
    }
  }
`;
export const formErrorStyle = css`
  margin: 0.25rem 0;
  color: #e00000;
`;
