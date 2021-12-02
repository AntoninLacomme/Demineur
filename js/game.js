

class Game {

    constructor (column, line, mines, coords) {
        this.demineur = new Demineur (column, line, mines, coords);
        this.grilleUser = this.createEmptyDemineur (column, line);

        this.width = column;
        this.height = line;
    }

    createEmptyDemineur (x, y) {
        let arrayDemineur = [];
        let line;
        for (let i=0; i<y; i++) {
            line = [];
            for (let j=0; j<x; j++) {
                line.push(null);
            }

            arrayDemineur.push(line);
        }
        return arrayDemineur;
    }

    leftClickAtPosition (coordClick, iterate = true) {
        // si la case cliquée n'a jamais été découverte
        if (this.grilleUser[coordClick.y][coordClick.x] == null) {
            this.grilleUser[coordClick.y][coordClick.x] = this.demineur.arrayDemineur[coordClick.y][coordClick.x];
            if (this.grilleUser[coordClick.y][coordClick.x] == 0) {
                for (let n=-1; n<2; n++) {
                    for (let m=-1; m<2; m++) {
                        try {
                            this.leftClickAtPosition({x: coordClick.x + n, y: coordClick.y + m});
                        }
                        catch (error) { }
                    }
                }
            }

            // on a fait sauter une mine, NAAAAAAN
            if (this.grilleUser[coordClick.y][coordClick.x] == -1) {
                console.log('kaput')
            }
            return;
        }

        // si la case cliquée a déjà été découverte,
        // on dévoile toutes les cases adjacentes non découvertes si la case cliquée possède déjà toutes ses mines trouvées
        // (selon l'utilisateur)

        if (iterate && this.grilleUser[coordClick.y][coordClick.x] >= 0) {
            let accCptMines = 0;
            for (let i=-1; i<2; i++) {
                for (let j=-1; j<2; j++) {
                    try {
                        if (this.grilleUser[coordClick.y + i][coordClick.x + j] == -2) {
                            accCptMines++;
                        }
                    }
                    catch (error) { }
                }
            }

            if (accCptMines == this.grilleUser[coordClick.y][coordClick.x]) {
              for (let i=-1; i<2; i++) {
                  for (let j=-1; j<2; j++) {
                      if ((coordClick.x+i >= 0 && coordClick.x+i < this.width) && (coordClick.y+j >= 0 && coordClick.y+j < this.height))
                      this.leftClickAtPosition ({x: coordClick.x+i, y: coordClick.y+j}, false);
                  }
              }
            }
        }

    }

    rightClickAtPosition (coordClick) {
        // -1 -> mine
        // -2 -> flag
        switch (this.grilleUser[coordClick.y][coordClick.x]) {
            case null :
                this.grilleUser[coordClick.y][coordClick.x] = -2;
                break;
            case -2 :
                this.grilleUser[coordClick.y][coordClick.x] = null;
                break;
            default :
                console.log("...");
        }
    }

    getGrille () { return this.grilleUser; }
}
