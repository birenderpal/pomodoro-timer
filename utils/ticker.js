export default class Ticker {
    constructor(duration,onTick,onEnd){
        this.duration = duration
        this.endTime = 0    
        this.onEnd = onEnd   
        this.running = false 
        this.onTick = onTick      
    }
    get timeRemaining(){        
        return this.endTime - Date.now()
    }
    get isRunning(){
        return this.running
    }
    stop=()=>{
        this.running = false
        this.duration = this.timeRemaining
        clearTimeout(this.timeout)
        this.timeout = null
    }
    start=()=>{
        if (this.running){
            return; 
        }
        else{
            this.endTime = Date.now() + this.duration
            this.running = true         
            this.tick()         
        }
    }
    tick=()=>{
        if (+this.timeRemaining <= 0) {   
            this.running = false
            this.onEnd()
        }
        else{            
            this.onTick(+this.timeRemaining)    
            this.timeout = setTimeout(this.tick,1000)
        }
    }
}