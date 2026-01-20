import { memo } from 'react';

const ListItem = ({ item }) =>
<div className="p-2 border-b border-gray-200 text-black">
    {item.name}
  </div>;


ListItem.displayName = "ListItem";

export default memo(ListItem);