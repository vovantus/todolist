import { v4 as uuidv4 } from 'uuid';

export class SingleTask {
    constructor(text, open, id = uuidv4() ) {
      this.text = text;
      this.open = open;
      this.id = id;
    }

    static toFireObj(task) {
        return {
            text: task.text,
            open: task.open,
            id: task.id
        }
    }
  }