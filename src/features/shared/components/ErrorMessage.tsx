import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Callout } from '@radix-ui/themes';
import type { Responsive } from '@radix-ui/themes/props';
import type { AriaRole } from 'react';

interface ErrorMessageProps {
  message: string;
  size?: Responsive<'1' | '2' | '3'>;
  role?: AriaRole;
}

export const ErrorMessage = ({ message, size = '3', role }: ErrorMessageProps) => {
  return (
    <Callout.Root
      color="red"
      size={size}
      role={role}
    >
      <Callout.Icon>
        <ExclamationTriangleIcon />
      </Callout.Icon>
      <Callout.Text>
        {message}
      </Callout.Text>
    </Callout.Root>
  );
};
