DEFAULT_PUZZLE = JSON.parse(`{"boardData":{"metadata":{"style":"new-yorker","valid":false,"title":"tester","author":"test"},"dimensions":[5,7],"answers":[["A","B","C","D","E"],["F","G","H","I","J"],["A","K","L","M","B"],["N","O","P","Q","R"],["S","T","U","V","W"],["X","Y","Z","A","C"],["B","C","D","E","D"]],"border-x":[[0,0,0,0],[0,1,0,0],[1,0,0,1],[0,0,1,0],[0,1,0,0],[0,0,0,1],[0,0,0,1]],"border-y":[[1,1,0,0,0],[0,1,1,0,0],[0,0,0,1,0],[0,1,0,0,1],[0,0,0,0,0],[0,0,1,0,0]],"clues":{"across":[],"down":[]}},"tableData":{"progstring":"_*_*_*_*_____*****_*___*_*_*_____*_*___*_*___*_***___*_*_*___*_*___*_*___*___*_*_***_***_*_*_*_*___***___*_*_*_*_*___","time":0,"progPercent":1.8846153846153846}}`)

class User {
    static blockSave = false;
    constructor(puzzles = {0: DEFAULT_PUZZLE}, lightOn = true, currentPuzzle = 0) {
        this.puzzles = puzzles; //rxf objects
        this.lightOn = lightOn;
        this.currentPuzzle = currentPuzzle; //UID
    }


    addPuzzle(puzzle, converted=false) {
        if (!converted) {
            puzzle = puzzle.toRXF();
        }
        this.puzzles[puzzle['boardData']['metadata'].uid] = puzzle
    }

    save() {
        if (User.blockSave) return;
        this.currentPuzzle = puzzle.uid;
        this.addPuzzle(puzzle);
        localStorage.setItem("user", JSON.stringify(user));
    }

    static download(event) {
        let data = "^" + JSON.stringify(user);
        this.setAttribute("href", "data:;base64," + btoa(data));
        this.setAttribute("download", "user.ruf");
    }

    render() {
        if (!user.lightOn) {
            user.lightOn = true;
            toggleDarkMode();
        }
    }

    static loadUser(user = null) {
        user = user == null ? window.localStorage.getItem("user") : user.substring(1);
        if (user == null) {
            return new User();
        }
        user = JSON.parse(user);
        user = new User(user.puzzles, user.lightOn, user.currentPuzzle);

        return user;
    }
}
