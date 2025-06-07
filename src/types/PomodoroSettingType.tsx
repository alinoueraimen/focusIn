import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type PomodoroSettings = {
    title? : string ;
    icon?: string ;
    iconObject?:IconProp ;
    sessionCount: number ;
    workDuration: number ;
    shortBreak: number ;
    longBreak: number ;
  };