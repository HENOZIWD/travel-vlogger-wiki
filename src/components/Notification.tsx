import { css } from '@emotion/react';
import { Box, Flex, Text } from '@radix-ui/themes';
import { elapsedTime } from '../utils/format';

export interface NotificationProps {
  type: 'SUCCESS' | 'FAILED';
  message: string;
  timestamp: number;
  isRead: boolean;
}

const SUCCESS_COLOR = '#a3ebc8';
const FAILED_COLOR = '#e47f7f';

export const Notification = ({ type, message, timestamp, isRead }: NotificationProps) => {
  return (
    <Flex
      gap="2"
      css={css`
        position: relative;
      `}
    >
      <Box
        width="0.25rem"
        css={css`
          background-color: ${
    type === 'SUCCESS'
      ? SUCCESS_COLOR
      : type === 'FAILED'
        ? FAILED_COLOR
        : 'none'};
          border-radius: 9999px;
          flex-shrink: 0;
        `}
      />
      <Box
        py="1"
        css={css`
          flex-grow: 1;
        `}
      >
        <Text
          as="p"
          size="2"
        >
          {message}
        </Text>
        <Text
          as="div"
          size="1"
          wrap="nowrap"
          align="right"
          mt="2"
        >
          {elapsedTime(timestamp)}
        </Text>
      </Box>
      {!isRead
        ? (
          <Box
            width="0.75rem"
            height="0.75rem"
            css={css`
              position: absolute;
              background-color: #e45454;
              border-radius: 9999px;
              top: 0;
              right: 0;
              transform: translate(50%, -50%);
            `}
          />
        )
        : null}
    </Flex>
  );
};
