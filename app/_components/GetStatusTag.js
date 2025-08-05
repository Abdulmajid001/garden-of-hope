import React from 'react';

function getStatusTag(status) {
  const normalizedStatus = status
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const statusColors = {
    unconfirmed: 'bg-yellow-200 text-yellow-800',
    confirmed: 'bg-blue-200 text-blue-800',
    checkedin: 'bg-green-200 text-green-800',
    checkedout: 'bg-indigo-200 text-indigo-800',
  };

  const key = status.replace(/[^a-zA-Z]/g, '').toLowerCase();
  const colorClass = statusColors[key] || 'bg-gray-200 text-gray-800';

  return (
    <p className={`ml-auto text-sm md:text-lg font-semibold px-3 px-2 rounded-full ${colorClass}`}>
      {normalizedStatus}
    </p>
  );
}

export default getStatusTag;
