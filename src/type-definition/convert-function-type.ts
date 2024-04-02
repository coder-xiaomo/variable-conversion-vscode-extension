export type EOL = '\n' | '\r\n';

export type ConvertFunction = (selectionText: string, eol: EOL) => string;