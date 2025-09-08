export const stringToColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 70%, 60%)`;
};

export const generateAvatarSVG = (
  firstName: string,
  lastName: string,
  size: number = 60
): string => {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  const color = stringToColor(`${firstName}${lastName}`);

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="${color}"/>
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
          font-family="Arial,sans-serif" font-size="${Math.floor(size / 2.5)}" 
          font-weight="bold" fill="white">${initials}</text>
  </svg>
    `
    .replace(/\n/g, "")
    .replace(/\s+/g, " ");

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};
