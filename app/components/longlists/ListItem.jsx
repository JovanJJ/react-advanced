import { memo } from 'react';

const ListItem = ({ item }) =>
<div className="p-2 border-b border-gray-700 text-gray-100">
    {item.name}
  </div>;


ListItem.displayName = "ListItem";

export default memo(ListItem);
