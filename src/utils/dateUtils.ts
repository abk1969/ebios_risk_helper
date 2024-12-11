export const formatDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(d);
};

export const getRelativeTime = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) {
    return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else if (hours < 24) {
    return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
  } else if (days < 30) {
    return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
  } else {
    return formatDate(d);
  }
}; 