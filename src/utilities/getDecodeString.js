import { decode } from 'html-entities';

export function getDecodeStringFacade(str) {
    return decode(str);
}