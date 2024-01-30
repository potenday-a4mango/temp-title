import React from 'react';
import { HashTagItem } from '../types/home';

export default function HashTag({
  hashTagItem,
}: {
  hashTagItem: HashTagItem;
}): JSX.Element {
  return <li>{`#${hashTagItem}`}</li>;
}
