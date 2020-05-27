export const drawGallow = ctx => {
    ctx.moveTo(40, 380);
    ctx.lineTo(160, 380);
    ctx.moveTo(60, 380);
    ctx.lineTo(60, 120);
    ctx.lineTo(120, 120)
    ctx.lineTo(120, 150)

    ctx.strokeStyle = '#000';
    ctx.stroke();
}

export const drawHead = ctx => {
    ctx.beginPath();
    ctx.arc(120, 170, 20, 0, 2 * Math.PI);

    ctx.strokeStyle = '#000';
    ctx.stroke(); 
}

export const drawTorso = (ctx) => {
    ctx.moveTo(120, 190);
    ctx.lineTo(120, 250);

    ctx.strokeStyle = '#000';
    ctx.stroke();
}

export const drawLeftArm = ctx => {
    ctx.moveTo(120, 205);
    ctx.lineTo(100, 235);

    ctx.strokeStyle = '#000';
    ctx.stroke();
}

export const drawRightArm = ctx => {
    ctx.moveTo(120, 205);
    ctx.lineTo(140, 235);

    ctx.strokeStyle = '#000';
    ctx.stroke();
}

export const drawLeftLeg = ctx => {
    ctx.moveTo(120, 250);
    ctx.lineTo(100, 285);

    ctx.strokeStyle = '#000';
    ctx.stroke();
}

export const drawRightLeg = ctx => {
    ctx.moveTo(120, 250);
    ctx.lineTo(140, 285);

    ctx.strokeStyle = '#000';
    ctx.stroke();
}