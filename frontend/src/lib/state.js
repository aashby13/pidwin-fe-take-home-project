import { BehaviorSubject, Subject } from "rxjs";
import { columnLength, rowLength } from "./contants";

/**
 * { success: boolean, result: string }
 * result:
 *  '1' = correct letter, correct position
 *  '0' = correct letter, incorrect position
 *  'x' = letter not in word
 */
export const wordCheck$ = new Subject();

/**
 * 6 dimensional array
 * { letter: string | null, state: string | null }
 * state:
 *  '1' = correct letter, correct position
 *  '0' = correct letter, incorrect position
 *  'x' = letter not in word
 *  null = not tested
 */
export const board$ = new BehaviorSubject(Array(columnLength).fill(Array(rowLength).fill({ letter: null, state: null })));


/**
 * { row: number, column: number, value: string }
 * row & column are zeo indexed
 */
export const currentPiece$ = new BehaviorSubject({ row: 0, column: 0, value: '' });