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
  const terms = term.split(' ').filter(Boolean);
  const regex = new RegExp(`(${terms.map(escapeRegExp).join('|')})`, 'gi');
  const parts = text.split(regex);
  
  return (
    <>
      {parts.map((part, i) => {
        const isMatch = terms.some(t => part.toLowerCase() === t.toLowerCase());
        return isMatch ? (
          <mark key={i}>{part}</mark>
        ) : (
          part
        );
      })}
    </>
  );
};
