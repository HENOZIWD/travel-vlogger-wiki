import { atom, useAtom } from 'jotai';

export interface Tag {
  id: number;
  name: string;
}

const tagAtom = atom<Tag[]>([]);
const addTagAtom = atom(null,
  (_get, set, update: Tag) => {
    set(tagAtom, (prev) => prev.some((tag) => tag.id === update.id) ? prev : [...prev, update]);
  },
);
const deleteTagAtom = atom(null,
  (_get, set, update: Tag) => {
    set(tagAtom, (prev) => prev.filter((tag) => tag.id !== update.id));
  },
);
const tagIdsAtom = atom((get) => get(tagAtom).map(({ id }) => id));

export const useTag = () => {
  const [tags] = useAtom(tagAtom);
  const [_1, addTag] = useAtom(addTagAtom);
  const [_2, deleteTag] = useAtom(deleteTagAtom);
  const [tagIds] = useAtom(tagIdsAtom);

  return {
    tags,
    addTag,
    deleteTag,
    tagIds,
  };
};
