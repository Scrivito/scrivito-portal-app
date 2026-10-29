const DATA_PLACEHOLDER_BODY =
  '__([a-zA-Z](?:[a-zA-Z0-9]|\\.[a-zA-Z]|(\\._id)|_(?!_)){0,100})__';

export const DATA_PLACEHOLDERS = new RegExp(DATA_PLACEHOLDER_BODY, 'gi');

export const SINGLE_DATA_PLACEHOLDER = new RegExp(
  `^${DATA_PLACEHOLDER_BODY}$`,
  'i',
);
