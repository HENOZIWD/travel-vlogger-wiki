import { Button, Flex } from '@radix-ui/themes';
import { ErrorMessage } from './ErrorMessage';

interface ErrorFallbackProps {
  error: Error;
  reset: () => void;
}

export const ErrorFallback = ({ error, reset }: ErrorFallbackProps) => {
  return (
    <Flex
      align="center"
      direction="column"
    >
      <ErrorMessage message={error.message} />
      <Button
        type="button"
        onClick={reset}
      >
        다시 시도
      </Button>
    </Flex>
  );
};
