export const INPUT = document.querySelector("input");
export const WON: HTMLElement = document.getElementById("won") as HTMLElement;
export const BTN_PLAY: HTMLElement = document.getElementById(
    "play"
) as HTMLElement;

export const PIC1: HTMLElement = document.getElementById("pic1") as HTMLElement;
export const PIC2: HTMLElement = document.getElementById("pic2") as HTMLElement;
export const PIC3: HTMLElement = document.getElementById("pic3") as HTMLElement;

export const PIC1_AREA: HTMLElement = document.getElementById(
    "pic1Area"
) as HTMLElement;
export const PIC2_AREA: HTMLElement = document.getElementById(
    "pic2Area"
) as HTMLElement;
export const PIC3_AREA: HTMLElement = document.getElementById(
    "pic3Area"
) as HTMLElement;

PIC1_AREA.style.width = document.body.clientWidth / 50 + "px";
PIC2_AREA.style.width = document.body.clientWidth / 50 + "px";
PIC3_AREA.style.width = document.body.clientWidth / 50 + "px";
