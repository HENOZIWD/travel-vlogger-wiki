import { v4 as uuidv4 } from 'uuid';

const SESSION_ID = 'sessionId';

export function getSessionId() {
  return sessionStorage.getItem(SESSION_ID);
}

export function createSessionId() {
  const id = uuidv4();
  sessionStorage.setItem(SESSION_ID, id);

  return id;
}
