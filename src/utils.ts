export const BOOL_VALUES = {
  TRUE: "true",
  FALSE: "false",
};

export const LOCAL_STORAGE = {
  CONSENT: "consent",
  ITEMS: "items",
};

export function cn(classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function uuid() {
  return Math.random().toString(32).substring(2);
}
