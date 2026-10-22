import { QUESTS } from './data.js';

// Counters live with Game; definitions, completion IDs and rewards are independent.
export class QuestManager {
  constructor(bus,inventory,saved={}) {this.bus=bus;this.inventory=inventory;this.completed=new Set(saved.completed||[]);}
  entries(progress,research) {
    return QUESTS.map(q=>({...q,current:q.research?(research.has(q.research)?1:0):Number(progress[q.counter]||0),claimed:this.completed.has(q.id)}));
  }
  update(progress,research) {
    for(const q of this.entries(progress,research)) if(q.current>=q.target&&!this.completed.has(q.id)) {
      // Mark before emitting or granting: saves and reentrant listeners cannot replay rewards.
      this.completed.add(q.id);
      this.inventory.grant(q.reward||{});
      this.bus.emit('questComplete',q);
    }
  }
  toJSON() {return {completed:[...this.completed]};}
}
