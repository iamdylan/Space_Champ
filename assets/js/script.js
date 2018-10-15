 //Initial position of hero for missile ref.
 var hero = {
            left: 48,
            top: 90
        };

        // Container for missiles.
        var missiles = [];

        //Container for enemies.
        var enemies = [
            { left: 8, top: 10 },
            { left: 18, top: 10 },
            { left: 28, top: 10 },
            { left: 38, top: 10 },
            { left: 48, top: 10 },
            { left: 58, top: 10 },
            { left: 68, top: 10 },
            { left: 78, top: 10 },
            { left: 8, top: 20 },
            { left: 18, top: 20 },
            { left: 28, top: 20 },
            { left: 38, top: 20 },
            { left: 48, top: 20 },
            { left: 58, top: 20 },
            { left: 68, top: 20 },
            { left: 78, top: 20 }
        ];
        
        //Mapping keys events to actions.
        document.onkeydown = function(e) {
            if (e.keyCode === 37) {
                // Left
                hero.left = hero.left - 1;
            }
            if (e.keyCode === 39) {
                // Right
                hero.left = hero.left + 1;
            }
            if (e.keyCode === 32) {
                // Spacebar (fire)
                missiles.push({
                    left: hero.left + 1.4,
                    top: hero.top - 1.4 
                });
                // drawMissiles()
            }
            drawHero();
        }

        //Place hero on screen.
        function drawHero() {
            document.getElementById('hero').style.left = hero.left + '%';
            document.getElementById('hero').style.top = hero.top + '%';
        }

        //Place missiles on screen.
        function drawMissiles() {
            document.getElementById('missiles').innerHTML = ""
            for(var i = 0 ; i < missiles.length ; i++ ) {
                document.getElementById('missiles').innerHTML += `<div class='missile1' style='left:${missiles[i].left}%; top:${missiles[i].top}%'></div>`;
            }
        }

        //Propel missiles forward.
        function moveMissiles() {
            for(var i = 0 ; i < missiles.length ; i++ ) {
                missiles[i].top = missiles[i].top - 4;
            }
        }

        //Place enemies on screen.
        function drawEnemies() {
            document.getElementById('enemies').innerHTML = ""
            for(var i = 0 ; i < enemies.length ; i++ ) {
                document.getElementById('enemies').innerHTML += `<div class='enemy' style='left:${enemies[i].left}%; top:${enemies[i].top}%'></div>`;
            }
        }

        //Move enemies towards hero.
        function moveEnemies() {
            for(var i = 0 ; i < enemies.length ; i++ ) {
                enemies[i].top = enemies[i].top + 0.4;
            }
        }

        //Check for missile hits on targets.
        function collisionDetection() {
            for (var enemy = 0; enemy < enemies.length; enemy++) {
                for (var missile = 0; missile < missiles.length; missile++) {
                    if ( 
                        missiles[missile].left >= enemies[enemy].left  &&
                        missiles[missile].left <= (enemies[enemy].left + 2.5)  &&
                        missiles[missile].top <= (enemies[enemy].top + 8)  &&
                        missiles[missile].top > enemies[enemy].top
                    ) {
                        enemies.splice(enemy, 1);
                        missiles.splice(missile, 1);
                    }
                }
            }
        }

        //Animate enemies.
        function enemygameLoop() {
            setTimeout(enemygameLoop, 500);
            moveEnemies();
            drawEnemies();
            
        }

        //Animate missiles.
        function missilegameLoop() {
            setTimeout(missilegameLoop, 200);
            moveMissiles();
            drawMissiles();
            collisionDetection();
        }

        //Function calls.
        missilegameLoop();
        enemygameLoop();