import { useEffect } from 'react';

export const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} | Namma Print House` : 'Namma Print House - Custom Premium Streetwear';
  }, [title]);
};
