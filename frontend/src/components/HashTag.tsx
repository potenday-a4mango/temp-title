import React from 'react';
import { HashTagItem } from '../types/home';

export default function HashTag({
  hashTagItem,
}: {
  hashTagItem: HashTagItem;
}): JSX.Element {
  return (
    <div className="bg-custom-light-gray rounded-custom-s-radius">
      <li className="text-custom-gray px-custom-gap-7 text-xs">{`#${hashTagItem}`}</li>
    </div>
  );
}
