<template>
 <div class="game">
    <el-row type="flex" justify="space-around">
      <el-col :span="4" class="flex justify-center">
        <div class="grid-content bg-purple-dark">
          <el-progress type="circle" :percentage="Player.health"></el-progress>
        </div>
        <h2>You</h2>
      </el-col>

      <el-col :span="4" class="flex justify-center">
        <div class="grid-content bg-purple-dark">
          <el-progress type="circle" :percentage="Opponent.health"></el-progress>
        </div>
        <h2>Opponent</h2>
      </el-col>
    </el-row>
    <el-row class="flex space-around">
      <el-col :span="8" style="margin:0 10px"> 
        <small>Attack</small><el-progress :text-inside="true" :stroke-width="26" :percentage="Player.skills.attack"></el-progress>
      </el-col>
      <el-col :span="8" style="margin:0 10px">   
        <small>Heal</small><el-progress :text-inside="true" :stroke-width="24" :percentage="Player.skills.heal" status="success"></el-progress>
      </el-col>
      <el-col :span="8" style="margin:0 10px"> 
        <small>Defense</small><el-progress :text-inside="true" :stroke-width="22" :percentage="Player.skills.defense" status="warning"></el-progress>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="6">
        <p>You have {{gameSettings.points}} points</p>
        <el-button :disabled="gameSettings.points <= 0" icon="el-icon-plus" @click="addPoints('attack')">Attack</el-button>
        <el-button :disabled="gameSettings.points <= 0" icon="el-icon-plus" @click="addPoints('heal')">Heal</el-button>
        <el-button :disabled="gameSettings.points <= 0" icon="el-icon-plus" @click="addPoints('defense')">Defense</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="6">
        <div class="buttons-grid">
          <el-tooltip class="item" effect="dark" :content="'Damage from 1 to ' + (Player.skills.attack / 10)" placement="top">
            <el-button :disabled="!gameSettings.isRunning" @click="attack" type="danger" plain>Attack</el-button>
          </el-tooltip>

          <el-badge :value="Player.specialAttacks" class="item" type="primary">
            <el-tooltip class="item" effect="dark" :content="'Damage from 10 to ' + (10 + Player.skills.attack / 10)" placement="top">
              <el-button :disabled="!gameSettings.isRunning || Player.specialAttacks <= 0" @click="specialAttack" type="danger" plain>Special Attack</el-button>
            </el-tooltip>
          </el-badge>

          <el-badge :value="Player.avaibleHeals" class="item" type="primary">
            <el-tooltip class="item" effect="dark" :content="'Heal for ' + (10 + Player.skills.heal / 10)" placement="top">
              <el-button :disabled="!gameSettings.isRunning || Player.avaibleHeals <= 0" @click="heal" type="success" plain>Heal</el-button>
            </el-tooltip>
          </el-badge>

          <el-tooltip class="item" effect="dark" :content="'20% chance for damage from 20 to ' + (20 + Player.skills.attack / 10)" placement="top">
            <el-button :disabled="!gameSettings.isRunning" @click="highRiskAttack" type="danger">Attack with high risk</el-button>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" :content="Math.floor(1 / (Player.skills.defense / 10) * 100) + '% Chance for opponent to hit you'" placement="top">
            <el-button :disabled="!gameSettings.isRunning" @click="defense" type="info" plain>Defense</el-button>
          </el-tooltip>
         
          <el-button type="danger" @click="restartGame">Restart/Play again</el-button>
          
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="6">
        <ul>
          <li v-for="(logg,index) in log.slice(0,10)" :key="index" :class="logg.includes('You') ? 'player-info' : 'opponent-info'">
            {{ logg }}
          </li>
        </ul>
      </el-col>
      
    </el-row>
    
    <el-row>
      <el-col :span="12" :offset="6" style="text-align:center">
        <i>This app is in beta phase, errors may occur.</i>
      </el-col>
    </el-row>
 </div>
</template>

<script>
export default {
  name: 'Game',
  props: {
    msg: String
  },
  data() {
    return {
      Player: {
        name: "You",
        health: 100,
        specialAttacks: 3,
        avaibleHeals: 5,
        skills:{
          attack: 10,
          heal: 10,
          defense: 10
        }
      },
      Opponent: {
        health: 100
      },
      gameSettings:{
        points: 2,
        isRunning: true
      },
      log: [

      ]
    }
  },
  methods: {
    addPoints(type){
      if(!this.gameSettings.points <= 0){
        switch(type){
          case 'attack':
            if(this.Player.skills.attack >= 100){
              return
            }
            this.Player.skills.attack += 10
            this.gameSettings.points -= 1;
          break

          case 'heal':
            if(this.Player.skills.heal >= 100){
              return
            }
            this.Player.skills.heal += 10
            this.gameSettings.points -= 1;
          break

          case 'defense':
            if(this.Player.skills.defense >= 100){
              return
            }
            this.Player.skills.defense += 10
            this.gameSettings.points -= 1;
          break
        }
      }else {
        alert("You don't have more points !")
      }
    },
    restartGame(){
      this.log = []
      this.Player = {
        name: "You",
        health: 100,
        specialAttacks: 3,
        avaibleHeals: 5,
        skills : {
          attack: 10,
          heal: 10,
          defense: 10
        }
      },
      this.Opponent = {
        health: 100
  
      },
      this.gameSettings = {
        points: 2,
        isRunning: true
      }
    },
    checkWin(){
      if(this.Player.health <= 0){
        this.Player.health = 0;
        if(confirm("You lost. Play again ?")){
          this.restartGame()
          return true
        }else {
          this.gameSettings.isRunning = false
          return true
        }
      }

      if(this.Opponent.health <= 0){
        this.Opponent.health = 0;
        if(confirm("You won. Play again ?")){
          this.restartGame()
          return true
        }else {
          this.gameSettings.isRunning = false
          return true
        }
      }
    },
    calculateDmg(attacker){
      if(attacker == "player") {
        let damage = Math.ceil(Math.random() * (this.Player.skills.attack / 10))
        return damage 
      }else {
        let damage = Math.ceil(Math.random() * 10)
        return damage 
      }
    },
    opponentAttack(){
      let chanceAttack = Math.ceil(Math.random() * 10)
      let chanceHeal = Math.ceil(Math.random() * 10)

      if(chanceAttack == 1 || chanceAttack == 2){
        let damage = this.calculateDmg() + 5
        this.Player.health -= damage;
        this.log.unshift('Opponent hits you with Special Attack for '  + damage)
        if(this.checkWin()){
          return
        } 
      }else {
        let damage = this.calculateDmg()
        this.Player.health -= damage;
        this.log.unshift("Opponent hits you with " + damage)
        if(this.checkWin()){
          return
        }
      }

      if(chanceHeal == 1 || chanceHeal == 2) {
        if(this.Opponent.health <= 90){
        this.Opponent.health += 10;
        this.log.unshift("Opponent healed himself for 10 ")
        }else {
          let healValue = 100 - this.Opponent.health
          this.Opponent.health = 100;
          this.log.unshift("Opponent healed himself for " + healValue)
        }
      }
      
    },
    playerAttack(type){
      if(type == "normal"){
        let damage = this.calculateDmg("player")
        this.Opponent.health -= damage
        this.log.unshift("You hit the opponent with " + damage)
        if(this.checkWin()){
          return
        }
        
      }else if(type == "special") {
        if(this.Player.specialAttacks > 0){
          let damage = this.calculateDmg("player") + 10
          this.Opponent.health -= damage
          this.Player.specialAttacks -= 1
          this.log.unshift("You hit the opponent with Special Attack for " + damage)
          if(this.checkWin()){
            return
          }
        }else { // If player doesn't have more avaible specialAttacks, hit opponent with normal attack.
          let damage = this.calculateDmg("player") 
          this.Opponent.health -= damage
          this.log.unshift("You hit the opponent with " + damage)
          if(this.checkWin()){
            return
          }
        }
   
      }else if(type == "highRiskAttack"){
          let damage = this.calculateDmg("player") + 20
          this.Opponent.health -= damage
          this.Player.specialAttacks -= 1
          this.log.unshift("You hit the opponent with High Risk Attack for " + damage)
          if(this.checkWin()){
            return
        }
      }
        
    },
    defense(){
      let chance = Math.ceil(Math.random() * (this.Player.skills.defense / 10))
      
      if(chance !== 1) {
        this.Opponent.health -= 2
        this.log.unshift("You defended yourself against an opponent's attack and your opponent lost 2% of health !")
        this.checkWin();
      }else {
        this.opponentAttack()
      }
    },
    highRiskAttack(){
      this.gameSettings.points ++
      let chance = Math.ceil(Math.random() * 10)

      if(chance == 1 || chance == 2){
        this.playerAttack("highRiskAttack")
      }else {
        this.log.unshift("You've missed !")
      }

      this.opponentAttack()
    },
    attack(){
      this.gameSettings.points ++
      let chance = Math.ceil(Math.random() * 10)
      if(chance == 1 || chance == 2 || chance == 3){
        this.Player.avaibleHeals++
      }
      if(this.gameSettings.isRunning){
        
        this.playerAttack("normal")
        
        this.opponentAttack()
        
      } 
    },
    specialAttack(){
      this.gameSettings.points ++

      let chance = Math.ceil(Math.random() * 10)
      if(chance == 1 || chance == 2 || chance == 3){
        this.Player.avaibleHeals++
      }

      if(this.gameSettings.isRunning){
        this.playerAttack("special")
        
        this.opponentAttack()
        
      }
    },
    heal(){
      if(!this.gameSettings.isRunning || this.Player.avaibleHeals <= 0){
        return
      }

      if(this.Player.health <= 90){
        this.Player.avaibleHeals -=1
        let heal = 10 + (this.Player.skills.heal / 10)
        this.Player.health += heal
        this.log.unshift("You healed yourself for " + heal)
      }else {
        this.Player.avaibleHeals -=1
        let healValue = 100 - this.Player.health
        this.Player.health = 100;
        this.log.unshift("You healed yourself for " + healValue)
      }
      this.opponentAttack()
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.el-row {
    margin-bottom: 50px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  

  .flex {
    display: flex;
  }

  .justify-center {
    justify-content: center;
  }

  .buttons-grid {
    display: flex;
    justify-content: space-between;
  }

  .opponent-info {
    color: red;
    background-color: lighten(rgb(165, 25, 25),50%);
  }

  .player-info {
    color: green;
    background-color: lighten(rgb(34, 167, 34),50%);
  }

  ul{
    list-style: none;
    margin: 0;
    padding: 0;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  ul li {
    text-align: center;
    margin: 5px 0;
    border: 1px solid gainsboro;
    padding: 5px;
    font-size: 18px;
  }

  .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .game {
    background-color: white;
    border-radius: 5px;
    padding: 40px;
  }
</style>
