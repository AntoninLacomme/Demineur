
class Demineur {

    static widthCell = 16;
    static margeCanvas = 20;

    static calcWidth (column) {
        return 2 * Demineur.margeCanvas + column * 30;
    }

    static calcHeight (line) {
        return 2 * Demineur.margeCanvas + line * 30;
    }

    static drawQuadrillage (ctx, n, m) {
        let max = Math.max(m, n);
        let min = (m + n) - max;
        ctx.save ();
        ctx.translate (Demineur.margeCanvas, Demineur.margeCanvas);

        for (let i = 0; i < Math.max(n, m) +1; i++) {
            // dessin des lignes verticales
            if (i <= n) {
                ctx.beginPath ();
                ctx.moveTo (i * 30, 0);
                ctx.lineTo (i * 30, m * 30);
                ctx.closePath ();
                ctx.stroke ();
            }

            if (i <= m) {
                ctx.beginPath ();
                ctx.moveTo (0, i * 30);
                ctx.lineTo (n * 30, i * 30, );
                ctx.closePath ();
                ctx.stroke ();
            }
        }
        ctx.restore ();
    }

    static drawDemineur (ctx, grille) {
        ctx.save ();
        /*ctx.translate (Demineur.margeCanvas + 15, Demineur.margeCanvas + 15);
        ctx.font = "15px Arial";
        ctx.textAlign = "center";*/

        for (let y = 0; y < grille.length; y++) {
            for (let x = 0; x < grille[y].length; x++) {
                if (grille[y][x] != null) {
                    Demineur.drawCellule (ctx, grille[y][x], x, y)
                    //ctx.fillText(grille[y][x], x * 30, y * 30);
                }
            }
        }

        ctx.restore ();
    }

    static drawCellule (ctx, value, x, y) {
        ctx.save ();
        ctx.translate (Demineur.margeCanvas + x * 30, Demineur.margeCanvas + y * 30);
        ctx.font = "20px Arial";
        ctx.textAlign = "center";

        switch (value) {
            case -2:
                Demineur.drawFlag (ctx, x, y);
                break;
            case -1:
                Demineur.drawMine (ctx, x, y);
                break;
            case 0:
                ctx.fillStyle = "rgb(180, 180, 180)";
                ctx.fillRect (0, 0, 30, 30);
                break;
            case 1:
                ctx.fillStyle = "rgb(190, 190, 190)";
                ctx.fillRect (0, 0, 30, 30);
                ctx.fillStyle = "blue";
                ctx.fillText(value, 15, 20);
                break;

            case 2:
                ctx.fillStyle = "rgb(190, 190, 190)";
                ctx.fillRect (0, 0, 30, 30);
                ctx.fillStyle = "green";
                ctx.fillText(value, 15, 20);
                break;

            case 3:
                ctx.fillStyle = "rgb(190, 190, 190)";
                ctx.fillRect (0, 0, 30, 30);
                ctx.fillStyle = "red";
                ctx.fillText(value, 15, 20);
                break;

            case 4:
                ctx.fillStyle = "rgb(190, 190, 190)";
                ctx.fillRect (0, 0, 30, 30);
                ctx.fillStyle = "darkblue";
                ctx.fillText(value, 15, 20);
                break;

            case 5:
                ctx.fillStyle = "rgb(190, 190, 190)";
                ctx.fillRect (0, 0, 30, 30);
                ctx.fillStyle = "firebrick";
                ctx.fillText(value, 15, 20);
                break;

            case 6:
                ctx.fillStyle = "rgb(190, 190, 190)";
                ctx.fillRect (0, 0, 30, 30);
                ctx.fillStyle = "lightblue";
                ctx.fillText(value, 15, 20);
                break;

            case 7:
                ctx.fillStyle = "rgb(190, 190, 190)";
                ctx.fillRect (0, 0, 30, 30);
                ctx.fillStyle = "crimson";
                ctx.fillText(value, 15, 20);
                break;

            case 8:
                ctx.fillStyle = "rgb(190, 190, 190)";
                ctx.fillRect (0, 0, 30, 30);
                ctx.fillStyle = "deepskyblue";
                ctx.fillText(value, 15, 20);
                break;

            default:
                ctx.fillText(value, 15, 15);
        }
        ctx.restore ();
    }

    static drawFlag (ctx, x, y) {
        ctx.save ();
        ctx.translate (2, 0);
        ctx.fillStyle = "red";
        ctx.strokeStyle = "black";
        ctx.beginPath ();
        ctx.moveTo (10, 5);
        ctx.lineTo (20, 10);
        ctx.lineTo (10, 15);
        ctx.closePath ();
        ctx.fill ();
        ctx.stroke ();

        ctx.beginPath ();
        ctx.moveTo (10, 15);
        ctx.lineTo (10, 25);
        ctx.closePath ();
        ctx.stroke ();

        ctx.beginPath ();
        ctx.moveTo (5, 25);
        ctx.lineTo (18, 25);
        ctx.closePath ();
        ctx.stroke ();

        ctx.restore ();
    }

    static drawMine (ctx, x, y) {
        ctx.save ();
        ctx.fillStyle = "grey";
        ctx.beginPath ();
        ctx.arc (15, 15, 10, Math.PI * 2, 0, false);
        ctx.closePath ();

        ctx.fill ();
        ctx.restore ();
    }

    static calcCoordonates (ptx, pty) {
        return {x: Math.trunc((ptx - Demineur.margeCanvas) / 30), y: Math.trunc((pty - Demineur.margeCanvas) / 30)}
    }

    constructor (n, m, mines, coordClick = null) {
        this.nbCellWidth = n;
        this.nbCellHeight = m;
        this.nbMines = mines;

        if (mines > n * m - 9) {
            this.nbMines = n * m - 9;
        }

        this.arrayDemineur = this.initializeArrayDemineur (coordClick);
    }


    /*
    * fonction créant une nouvelle grille de démineur
    */
    initializeArrayDemineur (coordClick) {
        let arrayDemineur = [];
        let line;
        let emplacements = [];

        // creation d'une matrice vide
        for (let i=0; i<this.nbCellHeight; i++) {
            line = [];
            for (let j=0; j<this.nbCellWidth; j++) {
                line.push(0);
                emplacements.push ({x: j, y:i})
            }
            arrayDemineur.push(line);
        }

        if (coordClick != null) {
          let spliceEmplacements = [];
          for (let n=-1; n<2; n++) {
              for (let m=-1; m<2; m++) {
                  let x = coordClick.x + n;
                  let y = coordClick.y + m;
                  if ((x >= 0 && x < this.nbCellWidth) && (y >= 0 && y < this.nbCellHeight)) {
                      spliceEmplacements.push({'x': x, 'y': y});
                  }
              }
          }

          for (let i = emplacements.length -1; i >= 0; i--) {
              for (let j = 0; j < spliceEmplacements.length; j++) {
                  if (emplacements[i].x == spliceEmplacements[j].x && emplacements[i].y == spliceEmplacements[j].y) {
                      emplacements.splice(i, 1);
                  }
              }
          }
        }

        // placement des mines dans la matrice
        let index, iterateur = 0;
        while (iterateur < this.nbMines) {
            index = (Math.random() * emplacements.length) | 0;
            arrayDemineur[emplacements[index].y][emplacements[index].x] = -1;

            // on incrémente les valeurs de toutes les cases alentours de 1 (si elles ne contiennent pas de mines, naturellement)
            for (let n=-1; n<2; n++) {
                for (let m=-1; m<2; m++) {
                    let y = emplacements[index].y + n;
                    let x = emplacements[index].x + m;

                    // testons maintenant le out of range
                    if ((x >= 0 && x < this.nbCellWidth) && (y >= 0 && y < this.nbCellHeight)) {
                        // maintenant testons la valeur de la cellule
                        if (arrayDemineur[y][x] >= 0) {
                            // incrémentation de la valeur
                            arrayDemineur[y][x]++;
                        }
                    }
                }
            }

            emplacements.splice(index, 1)
            iterateur ++;
        }
        return arrayDemineur;
    }

}
