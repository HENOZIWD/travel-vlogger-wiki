import { useEffect, useRef, useState } from 'react';
import { createSessionId, getSessionId } from '../utils/storage';
import { Box, Flex, IconButton, Popover } from '@radix-ui/themes';
import { BellIcon } from '@radix-ui/react-icons';
import { css } from '@emotion/react';
import { Notification, type NotificationProps as NotificationType } from './Notification';
import { safeParseJSON } from '../utils/format';
import { useQueryClient } from '@tanstack/react-query';

export const NotificationListener = () => {
  const [sessionId] = useState(() => {
    const id = getSessionId();
    if (id) return id;

    return createSessionId();
  });

  const [messages, setMessages] = useState<NotificationType[]>([]);
  const [notReadMessageCount, setNotReadMessageCount] = useState<number>(0);
  const queryClient = useQueryClient();

  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const eventSourceRef = useRef<EventSource>(null);

  useEffect(() => {
    const connect = () => {
      if (eventSourceRef.current) eventSourceRef.current.close();

      eventSourceRef.current = new EventSource(`${import.meta.env.VITE_BACKEND_URL}/events/${sessionId}`, { withCredentials: true });

      eventSourceRef.current.onopen = () => {
        setMessages((prev) => ([{
          type: 'SUCCESS',
          message: '알림 서버와 연결되었습니다.',
          timestamp: Date.now(),
          isRead: false,
        }, ...prev]));
      };

      eventSourceRef.current.onmessage = async (e) => {
        const data: NotificationType = safeParseJSON(e.data);
        if (!data) return;
        setMessages((prev) => [{
          ...data,
          isRead: false,
        }, ...prev]);
        if (data.type === 'SUCCESS') {
          await Promise.all([
            queryClient.invalidateQueries({ queryKey: ['contentList'] }),
            queryClient.invalidateQueries({ queryKey: ['contentDetail'] }),
          ]);
        }
        setNotReadMessageCount((prev) => prev + 1);
      };

      eventSourceRef.current.onerror = () => {
        eventSourceRef.current?.close();

        setMessages((prev) => ([{
          type: 'FAILED',
          message: '알림 서버와 연결 중 오류가 발생했습니다. 잦은 요청이나 서버 내부 오류가 원인일 수 있습니다. 1분 후 연결을 재시도합니다.',
          timestamp: Date.now(),
          isRead: false,
        }, ...prev]));
        setNotReadMessageCount((prev) => prev + 1);

        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(connect, 60000);
      };
    };

    connect();

    return () => {
      if (eventSourceRef.current) eventSourceRef.current.close();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [queryClient, sessionId]);

  const readMessages = () => {
    setMessages((prev) => prev.map((msg) => ({
      ...msg,
      isRead: true,
    })));
    setNotReadMessageCount(0);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) readMessages();
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
      </Popover.Content>
    </Popover.Root>
  );
};
