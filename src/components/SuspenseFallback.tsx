import { Flex, Spinner } from '@radix-ui/themes';

export const SuspenseFallback = () => {
  return (
    <Flex justify="center">
      <Spinner />
    </Flex>
  );
};
