import { useEffect, useRef, useState } from 'react';
import { createSessionId, getSessionId } from '../utils/storage';
import { Box, Flex, IconButton, Popover } from '@radix-ui/themes';
import { BellIcon } from '@radix-ui/react-icons';
import { css } from '@emotion/react';
import { Notification, type NotificationProps as NotificationType } from './Notification';
import { safeParseJSON } from '../utils/format';

export const NotificationListener = () => {
  const [sessionId] = useState(() => {
    const id = getSessionId();
    if (id) return id;

    return createSessionId();
  });

  const [messages, setMessages] = useState<NotificationType[]>([]);
  const [notReadMessageCount, setNotReadMessageCount] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const eventSource = new EventSource(`${import.meta.env.VITE_BACKEND_URL}/events/${sessionId}`, { withCredentials: true });

    eventSource.onmessage = (e) => {
      const data = safeParseJSON(e.data);
      if (!data) return;
      setMessages((prev) => [...prev, {
        ...data,
        isRead: false,
      }]);
      setNotReadMessageCount((prev) => prev + 1);
    };

    return () => eventSource.close();
  }, [sessionId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, []);

  const readMessages = () => {
    setMessages((prev) => prev.map((msg) => ({
      ...msg,
      isRead: true,
    })));
    setNotReadMessageCount(0);
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setTimeout(() => {
        scrollRef.current?.scrollIntoView();
      }, 0);
    }
    else {
      readMessages();
    }
  };

  return (
    <Popover.Root onOpenChange={handleOpenChange}>
      <Popover.Trigger>
        <IconButton
          size="4"
          css={css`
            position: absolute;
            z-index: 9999;
            top: 1rem;
            right: 1rem;
          `}
        >
          {notReadMessageCount > 0
            ? (
              <Box
                width="1.75rem"
                height="1.75rem"
                css={css`
                  position: absolute;
                  display: flex;
                  line-height: 1;
                  font-size: 0.875rem;
                  background-color: #e45454;
                  align-items: center;
                  justify-content: center;
                  padding: 0.25rem;
                  top: 0;
                  left: 0;
                  transform: translate(-50%, -50%);
                  border-radius: 9999px;
                `}
              >
                {notReadMessageCount}
              </Box>
            )
            : null}
          <BellIcon
            width="1.5rem"
            height="1.5rem"
          />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content
        maxHeight="16rem"
        maxWidth="24rem"
      >
        {messages.length > 0
          ? (
            <ul css={css`
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `}
            >
              {messages.map(({ type, message, timestamp, isRead }) => (
                <li key={timestamp}>
                  <Notification
                    type={type}
                    message={message}
                    timestamp={timestamp}
                    isRead={isRead}
                  />
                </li>
              ))}
            </ul>
          )
          : (
            <Flex
              justify="center"
              align="center"
              height="100%"
            >
              알림이 없습니다.
            </Flex>
          )}
        <div
          key="scrollTarget"
          ref={scrollRef}
        />
      </Popover.Content>
    </Popover.Root>
  );
};
