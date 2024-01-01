export const getInitials = (fullName) => {
  const names = fullName.split(" ");
  if (names.length > 1) {
    return `${names[0].charAt(0)}${names[1].charAt(0)}`.toUpperCase();
  }
  return fullName.charAt(0).toUpperCase();
};
