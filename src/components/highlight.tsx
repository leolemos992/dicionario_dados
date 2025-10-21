import React from 'react';

type HighlightProps = {
  text: string;
  term: string;
};

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const Highlight: React.FC<HighlightProps> = ({ text, term }) => {
  if (!term || !text) {
    return <>{text}</>;
  }
  const parts = text.split(new RegExp(`(${escapeRegExp(term)})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === term.toLowerCase() ? (
          <mark key={i}>{part}</mark>
        ) : (
          part
        )
      )}
    </>
  );
};
