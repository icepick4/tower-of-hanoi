export const INPUT = document.querySelector('input');
export const WON: HTMLElement = document.getElementById('won') as HTMLElement;
export const BTN_PLAY: HTMLElement = document.getElementById(
    'play'
) as HTMLElement;

const TOWER0: HTMLElement = document.getElementById('pic0') as HTMLElement;
const TOWER1: HTMLElement = document.getElementById('pic1') as HTMLElement;
const TOWER2: HTMLElement = document.getElementById('pic2') as HTMLElement;
export const TOWERS: HTMLElement[] = [TOWER0, TOWER1, TOWER2];

const TOWER_AREA0: HTMLElement = document.getElementById(
    'pic-area-0'
) as HTMLElement;
const TOWER_AREA1: HTMLElement = document.getElementById(
    'pic-area-1'
) as HTMLElement;
const TOWER_AREA2: HTMLElement = document.getElementById(
    'pic-area-2'
) as HTMLElement;
export const TOWERS_AREAS: HTMLElement[] = [TOWER_AREA0, TOWER_AREA1, TOWER_AREA2];

TOWER_AREA0.style.width = (document.body.clientWidth / 50).toString() + 'px';
TOWER_AREA1.style.width = (document.body.clientWidth / 50).toString() + 'px';
TOWER_AREA2.style.width = (document.body.clientWidth / 50).toString() + 'px';

const DROP_AREA0: HTMLElement = document.getElementById('DROP-AREA-0') as HTMLElement;
const DROP_AREA1: HTMLElement = document.getElementById('DROP-AREA-1') as HTMLElement;
const DROP_AREA2: HTMLElement = document.getElementById('DROP-AREA-2') as HTMLElement;
export const DROP_AREAS: HTMLElement[] = [DROP_AREA0, DROP_AREA1, DROP_AREA2];

export const CANCEL: HTMLElement = document.getElementById('cancel') as HTMLElement;
