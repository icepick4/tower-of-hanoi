export const INPUT = document.querySelector("input");
export const WON: HTMLElement = document.getElementById("won") as HTMLElement;
export const BTN_PLAY: HTMLElement = document.getElementById(
    "play"
) as HTMLElement;

export const TOWER0: HTMLElement = document.getElementById("pic0") as HTMLElement;
export const TOWER1: HTMLElement = document.getElementById("pic1") as HTMLElement;
export const TOWER2: HTMLElement = document.getElementById("pic2") as HTMLElement;
export const TOWERS: HTMLElement[] = [TOWER0, TOWER1, TOWER2];

export const TOWER_AREA0: HTMLElement = document.getElementById(
    "pic-area-0"
) as HTMLElement;
export const TOWER_AREA1: HTMLElement = document.getElementById(
    "pic-area-1"
) as HTMLElement;
export const TOWER_AREA2: HTMLElement = document.getElementById(
    "pic-area-2"
) as HTMLElement;
export const TOWERS_AREAS: HTMLElement[] = [TOWER_AREA0, TOWER_AREA1, TOWER_AREA2];

TOWER_AREA0.style.width = document.body.clientWidth / 50 + "px";
TOWER_AREA1.style.width = document.body.clientWidth / 50 + "px";
TOWER_AREA2.style.width = document.body.clientWidth / 50 + "px";

export const DROP_AREA0: HTMLElement = document.getElementById("DROP_AREA0") as HTMLElement;
export const DROP_AREA1: HTMLElement = document.getElementById("DROP_AREA1") as HTMLElement;
export const DROP_AREA2: HTMLElement = document.getElementById("DROP_AREA2") as HTMLElement;
export const DROP_AREAS: HTMLElement[] = [DROP_AREA0, DROP_AREA1, DROP_AREA2];
